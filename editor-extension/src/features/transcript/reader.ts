import { stat } from 'node:fs/promises';
import * as path from 'node:path';
import { emptyTail, foldTail, type Tail } from '../../seat/tail-fold.ts';
import {
	emptyEntryFold,
	emptyJournal,
	type Entry,
	type EntryFold,
	type FoldJournal,
	foldEntryLine,
	undoFold,
} from './model.ts';
import { readSubagentsIn, type SubagentTranscript } from './sources.ts';

// A TRANSCRIPT PANEL THAT READS WHAT WAS APPENDED, NOT WHAT IS THERE.
//
// The tick this replaces read the seat's transcript from its first byte and re-parsed it whole,
// then read and re-parsed every subagent transcript beneath it — and did that second part twice,
// once to render the settled slice and once to render the tail, because each call to `renderSlice`
// built its own `subagentEntries`. Measured on this fleet at load 30-37, one tick cost:
//
//     seat    jsonl      subagent files   bytes read   event loop held
//     thea     3.5 MB      16              20 MB          48-145 ms
//     dalla   10.5 MB      25              66 MB         273-528 ms
//     aine    17.2 MB     102             200 MB        448-1311 ms
//     ember   60.6 MB     416           1,079 MB       2979-7389 ms
//     amy    108.6 MB    1189           1,799 MB       5727-9507 ms
//
// against a 1s poll, with wall time and loop-held time equal to within 3ms — the whole of it
// synchronous. A blocked host repaints nothing, so this is every panel and the status line frozen
// together, and amy's seat froze the editor for longer than the poll interval nine times over.
//
// The reader holds one fold per file and asks each only for the bytes appended since the last poll.
// Nothing is written to disk: this fold is the rendered corpus, far too large for the cursor book at
// `~/.cache/ops/agent-tree-cursors.json` that `features/agent-tree/subagents.ts` keeps, so this adds
// no writer to that book and no contention on it.

export interface TranscriptRead {
	// Live arrays, owned by the reader. A caller reads them before it asks for the next read; the
	// next read may append to them and will take the uncommitted trailing record back out.
	readonly entries: readonly Entry[];
	readonly subagents: ReadonlyMap<string, SubagentTranscript>;
	readonly subagentEntries: ReadonlyMap<string, readonly Entry[]>;
	// What the poll cost, for the panel to say.
	readonly bytesFolded: number;
	readonly bytesThere: number;
	readonly filesFolded: number;
	readonly filesRefolded: number;
}

export interface TranscriptReader {
	readonly read: (transcriptPath: string) => Promise<TranscriptRead>;
}

interface Held {
	readonly tail: Tail;
	readonly fold: EntryFold;
	// Set while the fold carries the trailing partial record, which is not committed and is taken
	// back before the next fold reads those bytes again.
	uncommitted: FoldJournal | null;
	partial: string;
}

// The subagent roll is a readdir and one small read per subagent, and it changes only when a
// subagent starts. It is taken again when the directory's mtime moves.
interface Roll {
	readonly directory: string;
	readonly mtimeMs: number;
	readonly subagents: ReadonlyMap<string, SubagentTranscript>;
}

export function createTranscriptReader(): TranscriptReader {
	const held = new Map<string, Held>();
	let roll: Roll | null = null;

	const holdFor = (filePath: string): Held => {
		const existing = held.get(filePath);
		if (existing !== undefined) { return existing; }
		const fresh: Held = { tail: emptyTail(), fold: emptyEntryFold(), uncommitted: null, partial: '' };
		held.set(filePath, fresh);
		return fresh;
	};

	const foldFile = async (filePath: string): Promise<{ folded: number; bytesThere: number; refolded: boolean }> => {
		const one = holdFor(filePath);
		// Last read's trailing record comes back out first. Its bytes are about to be read again as
		// part of a whole line, and a fold that saw it twice would show the record twice.
		if (one.uncommitted !== null) {
			undoFold(one.fold, one.uncommitted);
			one.uncommitted = null;
			one.partial = '';
		}
		const outcome = await foldTail(one.tail, filePath, {
			line: (line) => foldEntryLine(one.fold, line),
			reset: () => {
				one.fold.entries.length = 0;
				one.fold.results.clear();
				one.fold.toolAt.clear();
				return undefined;
			},
		});
		if (outcome.missing) { return { folded: 0, bytesThere: 0, refolded: false }; }
		// The bytes after the last newline are a record the file has not finished writing. A read of
		// the whole file would have parsed them, so they are folded in — and journalled, so the next
		// fold takes them back rather than folding the finished record on top of the half of it.
		if (outcome.partial !== '') {
			const journal = emptyJournal();
			foldEntryLine(one.fold, outcome.partial, journal);
			one.uncommitted = journal;
			one.partial = outcome.partial;
		}
		return { folded: outcome.folded, bytesThere: outcome.bytesThere, refolded: outcome.refolded };
	};

	const entriesOf = (filePath: string): readonly Entry[] => held.get(filePath)?.fold.entries ?? [];

	const subagentRoll = async (transcriptPath: string): Promise<ReadonlyMap<string, SubagentTranscript>> => {
		const directory = path.join(transcriptPath.replace(/\.jsonl$/, ''), 'subagents');
		let mtimeMs: number;
		try {
			mtimeMs = (await stat(directory)).mtimeMs;
		} catch {
			roll = null;
			return new Map<string, SubagentTranscript>();
		}
		if (roll !== null && roll.directory === directory && roll.mtimeMs === mtimeMs) {
			return roll.subagents;
		}
		const subagents = await readSubagentsIn(directory);
		roll = { directory, mtimeMs, subagents };
		return subagents;
	};

	return {
		read: async (transcriptPath: string): Promise<TranscriptRead> => {
			let bytesFolded = 0;
			let bytesThere = 0;
			let filesFolded = 0;
			let filesRefolded = 0;

			const account = (one: { folded: number; bytesThere: number; refolded: boolean }): undefined => {
				bytesFolded += one.folded;
				bytesThere += one.bytesThere;
				if (one.folded > 0) { filesFolded += 1; }
				if (one.refolded) { filesRefolded += 1; }
				return undefined;
			};

			account(await foldFile(transcriptPath));

			const subagents = await subagentRoll(transcriptPath);
			const wanted = new Set<string>([transcriptPath]);
			const subagentEntries = new Map<string, readonly Entry[]>();
			for (const [toolUseId, subagent] of subagents) {
				wanted.add(subagent.filePath);
				account(await foldFile(subagent.filePath));
				subagentEntries.set(toolUseId, entriesOf(subagent.filePath));
			}

			// A fold for a file no longer in the roll is dropped, or a panel left open on a seat that
			// starts and finishes subagents all day holds every transcript it ever saw.
			for (const filePath of [...held.keys()]) {
				if (!wanted.has(filePath)) { held.delete(filePath); }
			}

			return {
				entries: entriesOf(transcriptPath),
				subagents,
				subagentEntries,
				bytesFolded,
				bytesThere,
				filesFolded,
				filesRefolded,
			};
		},
	};
}
