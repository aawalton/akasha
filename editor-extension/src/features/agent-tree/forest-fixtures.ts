import type { SeatMode } from '@akasha/editor-extension/seat-mode';
import type { SeatRow } from './forest.ts';
import type { SubagentNode } from './subagents.ts';

export const NO_SUBAGENTS: ReadonlyMap<string, readonly SubagentNode[]> = new Map();

export const NO_PLACES: ReadonlyMap<string, SeatMode> = new Map();

export function row(
	id: string,
	name: string | null,
	parent: string | null,
	principal: string | null = null
): SeatRow {
	return {
		id,
		name,
		parent_agent_id: parent,
		principal,
		state: null,
		waitingOn: null,
		color: null,
		at: null,
	};
}

export function subagent(
	key: string,
	label: string,
	children: readonly SubagentNode[] = [],
	agentId: string | null = null
): SubagentNode {
	return { key, label, agentId, children };
}
