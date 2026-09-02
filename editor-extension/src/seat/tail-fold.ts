import { open, stat } from 'node:fs/promises';

// READING A TRANSCRIPT FROM WHERE THE LAST READ STOPPED, IN PIECES THE EVENT LOOP CAN GET BETWEEN.
//
// A seat's transcript only ever grows, so a poll is owed the bytes appended since the last one and
// nothing else. Two readers in this extension want that and each had to work it out: the Agents
// panel's subagent reader (`features/agent-tree/subagents.ts`, landed at 3253ac18d5) and the
// transcript panel. What they share is exactly this — an offset held at a line ending, the anchor
// that says the file still reads the way it did when it was folded to there, and a chunked read
// that yields the loop between pieces. What they do NOT share is the bank: agent-tree's fold is a
// handful of id maps, small enough to write to `~/.cache/ops/agent-tree-cursors.json` and resume on
// the next activation, while the transcript panel's fold is the whole rendered corpus and has no
// business in that file or any other. Nothing here writes to disk.
//
// A file replaced under a path already folded would otherwise be resumed from an offset that means
// nothing there, and the panel would draw a transcript that is quietly wrong rather than merely
// late — the worse of the two. The anchor costs one 64-byte read per fold and refuses that file
// outright, telling the caller to drop what it holds and fold again from the first byte.

const NEWLINE = 0x0a;

const ANCHOR_BYTES = 64;

// How much is decoded and parsed before the loop is let go. 4MB of transcript is tens of
// milliseconds of `JSON.parse`, so a first fold of a 100MB seat is a hundred pauses of that rather
// than one hold of several seconds.
const CHUNK_BYTES = 4 * 1024 * 1024;

export interface Tail {
	// Where the last line the caller has taken in ends. Always a line ending, so it is always a
	// character boundary too, and a fold resumed there decodes what it was cut from.
	offset: number;
	anchor: string | null;
}

export interface TailFold {
	// Bytes newly folded, so a caller can say what a poll cost.
	readonly folded: number;
	readonly standing: number;
	// The file no longer reads as it did at `offset`, or it shrank. The caller's state was dropped
	// and what it holds now is a fold from the first byte.
	readonly refolded: boolean;
	readonly missing: boolean;
	// The bytes after the last line ending, which are not committed and will be read again next
	// fold. A reader that must answer exactly what a read of the whole file answers folds these too
	// and then takes the fold back — see `foldEntryLine`'s journal. Empty in all but a file caught
	// between the write of a record and the write of its newline.
	readonly partial: string;
}

export function emptyTail(): Tail {
	return { offset: 0, anchor: null };
}

// The bytes that end `offset`. A short read means the file no longer reaches that far.
async function anchorEnding(filePath: string, offset: number): Promise<string | null> {
	if (offset <= 0) { return null; }
	const from = Math.max(0, offset - ANCHOR_BYTES);
	const wanted = offset - from;
	const buffer = Buffer.allocUnsafe(wanted);
	let handle;
	try {
		handle = await open(filePath, 'r');
	} catch {
		return null;
	}
	try {
		const { bytesRead } = await handle.read(buffer, 0, wanted, from);
		if (bytesRead !== wanted) { return null; }
	} catch {
		return null;
	} finally {
		await handle.close();
	}
	return buffer.toString('base64');
}

export interface TailSink {
	// One whole line, in file order.
	readonly line: (line: string) => undefined;
	// Everything folded so far is void. Called before any line of the refold.
	readonly reset: () => undefined;
}

export async function foldTail(tail: Tail, filePath: string, sink: TailSink): Promise<TailFold> {
	let standing: number;
	try {
		standing = (await stat(filePath)).size;
	} catch {
		return { folded: 0, standing: 0, refolded: false, missing: true, partial: '' };
	}

	let refolded = false;
	const restart = (): undefined => {
		tail.offset = 0;
		tail.anchor = null;
		refolded = true;
		sink.reset();
		return undefined;
	};

	if (standing < tail.offset) {
		restart();
	} else if (tail.offset > 0 && (await anchorEnding(filePath, tail.offset)) !== tail.anchor) {
		restart();
	}

	if (standing === tail.offset) {
		return { folded: 0, standing, refolded, missing: false, partial: '' };
	}

	const began = tail.offset;
	// CARRIED AS BYTES, NEVER AS TEXT. A piece boundary is a byte count and lands mid-character as
	// often as not; decoding a piece that ends mid-character turns those bytes into a replacement
	// character, and no amount of prepending the next piece puts the character back. Held on this
	// fleet, a 36MB transcript folded in 4MB pieces and one 14,402-character tool result came back
	// 14,404 characters long. Only a line ending is decoded through, because a line ending is always
	// a character boundary.
	let carry = Buffer.alloc(0);
	let read = tail.offset;
	const handle = await open(filePath, 'r');
	try {
		while (read < standing) {
			const length = Math.min(CHUNK_BYTES, standing - read);
			const buffer = Buffer.allocUnsafe(length);
			const { bytesRead } = await handle.read(buffer, 0, length, read);
			if (bytesRead === 0) { break; }
			read += bytesRead;
			const piece = carry.length === 0
				? buffer.subarray(0, bytesRead)
				: Buffer.concat([carry, buffer.subarray(0, bytesRead)]);
			const lastLineEnd = piece.lastIndexOf(NEWLINE, piece.length - 1);
			if (lastLineEnd < 0) {
				// No line ends in this piece. Hold its bytes and read on; the offset may not advance
				// past a line the caller has not been given whole.
				carry = Buffer.from(piece);
				continue;
			}
			const whole = piece.subarray(0, lastLineEnd + 1).toString('utf8');
			carry = Buffer.from(piece.subarray(lastLineEnd + 1));
			tail.offset = read - carry.length;
			for (const line of whole.split('\n')) {
				if (line === '') { continue; }
				sink.line(line);
			}
			// The loop is let go between pieces, so a first fold of a large transcript is many short
			// holds rather than one long one.
			await Promise.resolve();
		}
	} finally {
		await handle.close();
	}

	// The offset comes to rest at the last line ending, never at the last byte read: bytes after it
	// are a record the caller has not been given whole, and an offset past them would let the next
	// fold skip that record entire. Those bytes are handed back as `partial` and read again next
	// fold, so nothing is carried across a call and the anchor and the offset name the same byte.
	const partial = carry.toString('utf8');
	tail.anchor = tail.offset > 0 ? await anchorEnding(filePath, tail.offset) : null;

	return { folded: tail.offset - began, standing, refolded, missing: false, partial };
}
