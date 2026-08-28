import { open, stat } from 'node:fs/promises';
import * as path from 'node:path';
import { z } from 'zod';
import { applyRecord, emptySubagentState, isJsonObject, type RunningSubagent, runningSubagents, type SubagentState } from './subagent-core.ts';

const TRANSCRIPT_RECORD = z.custom<Record<string, unknown>>(isJsonObject);

export interface SubagentNode {
	readonly key: string;
	readonly label: string;
	readonly children: readonly SubagentNode[];
}

const MAX_SUBAGENT_DEPTH = 5;

interface Cursor {
	path: string;
	offset: number;
	carry: string;
	state: SubagentState;
}

export interface SubagentReader {
	readonly forSeat: (agentId: string, transcriptPath: string) => Promise<readonly SubagentNode[]>;
	readonly dropUntouched: () => undefined;
}

export function createSubagentReader(): SubagentReader {
	const cursors = new Map<string, Cursor>();
	const touched = new Set<string>();

	const advance = async (cursorKey: string, filePath: string): Promise<SubagentState> => {
		touched.add(cursorKey);
		let cursor = cursors.get(cursorKey);
		if (cursor === undefined || cursor.path !== filePath) {
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
			return cursor.state;
		}
		if (size < cursor.offset) {
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
