/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Reading each live seat's transcript for the subagents working under it, and
 * the subagents working under those.
 *
 * INCREMENTAL BECAUSE THE WHOLE CORPUS IS TOO BIG TO RE-READ. The 31 live seats
 * on this host carry 97.7 MB of transcript between them and the largest is
 * 23.5 MB. Re-reading all of it on a ten-second poll is 10 MB/s of file traffic
 * and JSON parsing in the extension host, forever, for a tree nobody is watching
 * change. So each transcript is read once and afterwards only from the byte
 * offset it had last time.
 *
 * THAT IS EXACT RATHER THAN AN APPROXIMATION, because the rule the core applies
 * is a fold over the records in order: folding the records a file grew by onto
 * the state that file already produced gives the same answer as folding the
 * whole file. The state IS the summary of everything read so far.
 *
 * THE STATE SURVIVES A ROTATION AND THE OFFSET DOES NOT. A session id rotates on
 * resume and on compact — 13 of the 31 live seats here are on a rotated
 * transcript — and each rotation starts a fresh file that replays nothing. A
 * subagent launched before the rotation is still working and its notification
 * will arrive in the NEW file, so discarding what we knew would drop it from the
 * tree until it happened to die. The offset resets; what the fold knows does not.
 */
import { open, stat } from 'node:fs/promises';
import * as path from 'node:path';
import { z } from 'zod';
import { applyRecord, emptySubagentState, isJsonObject, type RunningSubagent, runningSubagents, type SubagentState } from './subagent-core.ts';

/**
 * One transcript line. Claude Code owns this file's shape and versions it
 * without us, so nothing here declares a key: a schema naming fields would
 * reject every transcript the next release writes, and the tree would go quietly
 * empty over a corpus it had stopped reading. Being an object is the whole of
 * what is demanded, and the fold asks for each field it wants.
 */
const TRANSCRIPT_RECORD = z.custom<Record<string, unknown>>(isJsonObject);

/** A subagent on the tree, with whatever it is running under it. */
export interface SubagentNode {
	readonly key: string;
	readonly label: string;
	readonly children: readonly SubagentNode[];
}

/**
 * How far down the subagent chain this will look.
 *
 * A subagent can run a subagent — 3,696 of the 11,836 on this host were spawned
 * below the first level, and the deepest was five down. This bounds the walk
 * rather than asserting a depth, so a longer chain still resolves to where it
 * stops and nothing recurses without end.
 */
const MAX_SUBAGENT_DEPTH = 5;

/** Where one transcript has been read to, and what reading it established. */
interface Cursor {
	path: string;
	offset: number;
	/** A final line the last read cut in half. Transcripts are appended to live. */
	carry: string;
	state: SubagentState;
}

/**
 * The reader, holding one cursor per transcript across polls.
 *
 * A seat keeps its cursor under its own agent id rather than under the
 * transcript path, which is what lets the state outlive a rotation: the path on
 * the cursor is compared to the path the sentinel now gives, and a difference
 * resets the offset alone.
 */
export interface SubagentReader {
	readonly forSeat: (agentId: string, transcriptPath: string) => Promise<readonly SubagentNode[]>;
	/**
	 * Drops every cursor the refresh just ended did not read, so a window left
	 * open for days does not accrete one per subagent that ever ran. Called once
	 * at the end of a refresh, by which point a live seat and a running subagent
	 * have each been read and a stopped one has not.
	 */
	readonly dropUntouched: () => undefined;
}

export function createSubagentReader(): SubagentReader {
	// Keyed by seat agent id for the top level, and by transcript path for the
	// subagent transcripts below it, which have no seat of their own.
	const cursors = new Map<string, Cursor>();
	const touched = new Set<string>();

	const advance = async (cursorKey: string, filePath: string): Promise<SubagentState> => {
		touched.add(cursorKey);
		let cursor = cursors.get(cursorKey);
		if (cursor === undefined || cursor.path !== filePath) {
			// A first read, or a rotation. The fold's state is carried over where
			// there is one; only the position in the file starts again.
			cursor = {
				path: filePath,
				offset: 0,
				carry: '',
				state: cursor?.state ?? emptySubagentState(),
			};
			cursors.set(cursorKey, cursor);
		}

		let size: number;
		try {
			size = (await stat(filePath)).size;
		} catch {
			// An absent transcript is a seat that has not spoken yet, not a fault.
			return cursor.state;
		}
		if (size < cursor.offset) {
			// Truncated or replaced under the same name. Read it again from the top.
			cursor.offset = 0;
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
			cursor.offset += bytesRead;
		} finally {
			await handle.close();
		}

		const lines = (cursor.carry + text).split('\n');
		// The last piece is either a complete line with nothing after it or a
		// half-written one. Either way it is carried rather than parsed, and the
		// next read completes it.
		cursor.carry = lines.pop() ?? '';
		for (const line of lines) {
			if (line.trim().length === 0) { continue; }
			try {
				const parsed = TRANSCRIPT_RECORD.safeParse(JSON.parse(line));
				if (parsed.success) { applyRecord(cursor.state, parsed.data); }
			} catch {
				// Claude Code owns this file's shape and versions it without us, and a
				// live transcript's last line is routinely half-written. One line that
				// will not parse must not cost the tree the rest of the file.
			}
		}
		return cursor.state;
	};

	/**
	 * A subagent's own transcript sits beside its parent's, in a directory named
	 * for the session — and NESTED subagents are written flat into that same
	 * directory rather than under one another, so one path shape reaches every
	 * depth. The id in the file name is the agent id, which is the same string the
	 * launch result and the notification both carry.
	 */
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

	return {
		forSeat: async (agentId: string, transcriptPath: string) => {
			const state = await advance(agentId, transcriptPath);
			const subagentsDir = path.join(transcriptPath.replace(/\.jsonl$/, ''), 'subagents');
			return descend(runningSubagents(state), subagentsDir, 1);
		},
		dropUntouched: () => {
			for (const key of [...cursors.keys()]) { if (!touched.has(key)) { cursors.delete(key); } }
			touched.clear();
			return undefined;
		},
	};
}
