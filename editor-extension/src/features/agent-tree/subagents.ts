import { open, stat } from 'node:fs/promises';
import * as path from 'node:path';
import { z } from 'zod';
import { anchorEnding, type Checkpoint, readCheckpoints, writeCheckpoints } from './subagent-checkpoints.ts';
import { applyRecord, emptySubagentState, isJsonObject, type RunningSubagent, runningSubagents, type SubagentState } from './subagent-core.ts';

const TRANSCRIPT_RECORD = z.custom<Record<string, unknown>>(isJsonObject);

export interface SubagentNode {
	readonly key: string;
	readonly label: string;
	readonly children: readonly SubagentNode[];
}

const MAX_SUBAGENT_DEPTH = 5;

const NEWLINE = 0x0a;

interface Cursor {
	path: string;
	offset: number;
	// Where the last line the state has taken in ends. Read off the bytes rather than measured
	// back off `carry`, because a read that lands mid-character decodes those bytes to one
	// replacement character and `carry` no longer weighs what it was cut from.
	boundary: number;
	carry: string;
	state: SubagentState;
}

export interface SubagentReader {
	readonly forSeat: (agentId: string, transcriptPath: string) => Promise<readonly SubagentNode[]>;
	// Awaited, because this is where the fold is banked. Left to a floating promise it never landed
	// in a host that reads the fleet once and exits — `tools/extension-panels-draw.ts` is one, and
	// it would have proved the resume green while never once taking it.
	readonly dropUntouched: () => Promise<undefined>;
}

// A fold is banked at most this often. Every poll advances some cursor, and the book is worth far
// less than a write a second on Alan's disk for the rest of the day.
const BANK_INTERVAL_MS = 10_000;

export function createSubagentReader(): SubagentReader {
	const cursors = new Map<string, Cursor>();
	const touched = new Set<string>();
	// Read at once rather than on first use, so it lands while `agent-forest` is still being asked.
	const banked = readCheckpoints().catch(() => new Map<string, Checkpoint>());
	let moved = false;
	let bankedAt = 0;

	const advance = async (cursorKey: string, filePath: string): Promise<SubagentState> => {
		touched.add(cursorKey);
		let cursor = cursors.get(cursorKey);
		let resumable: Checkpoint | undefined;
		if (cursor === undefined || cursor.path !== filePath) {
			// A cursor that already stands for another file keeps its state, so what it knows is
			// newer than the book and the book is not consulted.
			if (cursor === undefined) {
				const held = (await banked).get(cursorKey);
				if (held !== undefined && held.path === filePath) { resumable = held; }
			}
			cursor = {
				path: filePath,
				offset: 0,
				boundary: 0,
				carry: '',
				state: cursor?.state ?? emptySubagentState(),
			};
			cursors.set(cursorKey, cursor);
			moved = true;
		}

		let size: number;
		try {
			size = (await stat(filePath)).size;
		} catch {
			return cursor.state;
		}

		if (
			resumable !== undefined &&
			resumable.offset <= size &&
			(await anchorEnding(filePath, resumable.offset)) === resumable.anchor
		) {
			cursor.offset = resumable.offset;
			cursor.boundary = resumable.offset;
			cursor.state = resumable.state;
		}

		if (size < cursor.offset) {
			cursor.offset = 0;
			cursor.boundary = 0;
			cursor.carry = '';
		}
		if (size === cursor.offset) { return cursor.state; }

		let text: string;
		const handle = await open(filePath, 'r');
		try {
			const length = size - cursor.offset;
			const buffer = Buffer.allocUnsafe(length);
			const { bytesRead } = await handle.read(buffer, 0, length, cursor.offset);
			text = buffer.subarray(0, bytesRead).toString('utf8');
			const lastLineEnd = bytesRead === 0 ? -1 : buffer.lastIndexOf(NEWLINE, bytesRead - 1);
			if (lastLineEnd >= 0) { cursor.boundary = cursor.offset + lastLineEnd + 1; }
			cursor.offset += bytesRead;
			if (bytesRead > 0) { moved = true; }
		} finally {
			await handle.close();
		}

		const lines = (cursor.carry + text).split('\n');
		cursor.carry = lines.pop() ?? '';
		for (const line of lines) {
			if (line.trim().length === 0) { continue; }
			try {
				const parsed = TRANSCRIPT_RECORD.safeParse(JSON.parse(line));
				if (parsed.success) { applyRecord(cursor.state, parsed.data); }
			} catch {
			}
		}
		return cursor.state;
	};

	const descend = async (
		running: readonly RunningSubagent[],
		subagentsDir: string,
		depth: number
	): Promise<readonly SubagentNode[]> => {
		const nodes: SubagentNode[] = [];
		for (const subagent of running) {
			let children: readonly SubagentNode[] = [];
			if (subagent.agentId !== null && depth < MAX_SUBAGENT_DEPTH) {
				const childPath = path.join(subagentsDir, `agent-${subagent.agentId}.jsonl`);
				const state = await advance(childPath, childPath);
				children = await descend(runningSubagents(state), subagentsDir, depth + 1);
			}
			nodes.push({ key: subagent.key, label: subagent.label, children });
		}
		return nodes;
	};

	// A cursor is banked at the last line it finished, never mid-record: `carry` holds the bytes of
	// a line not yet parsed, and a resumed fold that skipped them would lose a record entire.
	const bank = async (): Promise<undefined> => {
		const book = new Map<string, Checkpoint>();
		for (const [key, cursor] of cursors) {
			if (cursor.boundary <= 0) { continue; }
			const anchor = await anchorEnding(cursor.path, cursor.boundary);
			if (anchor === null) { continue; }
			book.set(key, { path: cursor.path, offset: cursor.boundary, anchor, state: cursor.state });
		}
		await writeCheckpoints(book);
		return undefined;
	};

	return {
		forSeat: async (agentId: string, transcriptPath: string) => {
			const state = await advance(agentId, transcriptPath);
			const subagentsDir = path.join(transcriptPath.replace(/\.jsonl$/, ''), 'subagents');
			return descend(runningSubagents(state), subagentsDir, 1);
		},
		dropUntouched: async () => {
			for (const key of [...cursors.keys()]) {
				if (!touched.has(key)) {
					cursors.delete(key);
					moved = true;
				}
			}
			touched.clear();
			const now = Date.now();
			if (moved && now - bankedAt >= BANK_INTERVAL_MS) {
				moved = false;
				bankedAt = now;
				// A book that fails to land costs a refold, never a wrong row, so it is not raised.
				await bank().catch(() => undefined);
			}
			return undefined;
		},
	};
}
