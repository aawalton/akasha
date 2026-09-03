import * as path from 'node:path';
import { z } from 'zod';
import { emptyTail, foldTail, type Tail } from '../../seat/tail-fold.ts';
import { anchorEnding, type Checkpoint, readCheckpoints, writeCheckpoints } from './subagent-checkpoints.ts';
import { applyRecord, emptySubagentState, isJsonObject, type RunningSubagent, runningSubagents, type SubagentState } from './subagent-core.ts';

const TRANSCRIPT_RECORD = z.custom<Record<string, unknown>>(isJsonObject);

export interface SubagentNode {
	readonly key: string;
	readonly label: string;
	// The id this subagent runs under, which is the second half of its agent id and the half its
	// page is named for. Null until the Agent call it was dispatched by hands back a result naming
	// it, and null for good where that call never does. A row holding null is a row akasha's pages
	// cannot be keyed to, so it opens nothing.
	readonly agentId: string | null;
	readonly children: readonly SubagentNode[];
}

const MAX_SUBAGENT_DEPTH = 5;

interface Cursor {
	path: string;
	// Where the fold sits, held by `seat/tail-fold.ts`: always at a line ending, beside the 64
	// bytes that say the file still reads the way it did when it was folded to there. This reader
	// used to keep its own offset at the last byte READ and carry the undecoded remainder as text,
	// which is where records came back wrong: a read ends at the file's size and a file being
	// appended to lands mid-character as often as not, so those bytes decoded to a replacement
	// character and no amount of prepending them to the next read put the character back. The
	// transcript panel's fold had the same defect and the same cure, so there is one implementation
	// of it rather than two that must stay in step.
	tail: Tail;
	// Replaced outright when the fold restarts, never merged into: a file that no longer reads the
	// way it did is being read from its first byte again, and what this held describes bytes that
	// are gone.
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
	const bankedBook = readCheckpoints().catch(() => new Map<string, Checkpoint>());
	let moved = false;
	let bankedAt = 0;

	const advance = async (cursorKey: string, filePath: string): Promise<SubagentState> => {
		touched.add(cursorKey);
		let held = cursors.get(cursorKey);
		if (held === undefined || held.path !== filePath) {
			// A cursor that already represents another file keeps its state, so what it knows is
			// newer than the book and the book is not consulted. Its fold starts at the first byte
			// of the file now named, which is not a restart of the same file and does not drop it.
			let tail = emptyTail();
			let state = held?.state ?? emptySubagentState();
			if (held === undefined) {
				const banked = (await bankedBook).get(cursorKey);
				if (banked !== undefined && banked.path === filePath) {
					// The offset, the anchor and the state are taken together or not at all. The
					// fold checks the anchor at that offset and, where the file no longer reads
					// that way, restarts from the first byte and drops the state through `reset`.
					tail = { offset: banked.offset, anchor: banked.anchor };
					state = banked.state;
				}
			}
			held = { path: filePath, tail, state };
			cursors.set(cursorKey, held);
			moved = true;
		}

		const cursor = held;
		const fold = await foldTail(cursor.tail, filePath, {
			line: (line) => {
				if (line.trim().length === 0) { return undefined; }
				try {
					const parsed = TRANSCRIPT_RECORD.safeParse(JSON.parse(line));
					if (parsed.success) { applyRecord(cursor.state, parsed.data); }
				} catch {
				}
				return undefined;
			},
			reset: () => {
				cursor.state = emptySubagentState();
				return undefined;
			},
		});
		// `folded` counts the bytes committed, which stops at the last line ending: a poll that read
		// half a record has moved nothing worth banking, and says so.
		if (fold.folded > 0) { moved = true; }
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
			nodes.push({
				key: subagent.key,
				label: subagent.label,
				agentId: subagent.agentId,
				children,
			});
		}
		return nodes;
	};

	// A cursor is banked at the last line it finished, never mid-record. `tail.offset` is that line
	// ending and nothing else — the fold holds it there and hands back the bytes past it rather
	// than committing them — so a checkpoint never claims more bytes than were folded, and a fold
	// resumed on it cannot skip a record. The anchor is read again here rather than taken off the
	// tail, so a path whose file has since gone is dropped from the book instead of banked.
	const bank = async (): Promise<undefined> => {
		const writing = new Map<string, Checkpoint>();
		for (const [key, cursor] of cursors) {
			if (cursor.tail.offset <= 0) { continue; }
			const anchor = await anchorEnding(cursor.path, cursor.tail.offset);
			if (anchor === null) { continue; }
			writing.set(key, { path: cursor.path, offset: cursor.tail.offset, anchor, state: cursor.state });
		}
		await writeCheckpoints(writing);
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
