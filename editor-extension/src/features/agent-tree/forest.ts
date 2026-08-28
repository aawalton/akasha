import { dropDerivers } from '../../../../tools/lib/deriver-hold.ts';
import { askSeatForest } from '../../../../tools/lib/seat-forest-asked.ts';
import { colorOfState } from '../../../../tools/lib/seat-turn-color.ts';
import type { SeatMode } from '../../seat/mode.ts';
import { seatTranscriptOf } from '../transcript/sources.ts';
import type { HarnessRow } from './harness.ts';
import { readSeatPlaces } from './lookup.ts';
import type { SubagentNode, SubagentReader } from './subagents.ts';

const ALAN = 'alan';

export function dropSeatAnswers(): void {
	dropDerivers();
}

export interface SeatRow {
	readonly id: string;
	readonly name: string | null;
	readonly parent_agent_id: string | null;
	readonly principal: string | null;
	readonly state: string | null;
	readonly waitingOn: string | null;
	readonly colour: string | null;
}

export type AgentKind = 'seat' | 'subagent';

export interface AgentNode {
	readonly id: string;
	readonly name: string;
	readonly kind: AgentKind;
	readonly place?: SeatMode;
	readonly live: boolean;
	readonly state?: string | undefined;
	readonly waitingOn?: string | undefined;
	readonly colour?: string | undefined;
	readonly children: readonly AgentNode[];
}

export interface AgentForest {
	readonly roots: readonly AgentNode[];
	readonly alanPrincipalCount: number;
	readonly runningCount: number;
}

export async function readAgentForest(subagents: SubagentReader): Promise<AgentForest> {
	const rows: readonly HarnessRow[] = askSeatForest().map((one) => ({ ...one, colour: one.color }));
	const liveIds = new Set(rows.filter((row) => row.live).map((row) => row.id));

	const running = new Map<string, readonly SubagentNode[]>();
	await Promise.all(
		[...liveIds].map(async (id) => {
			const stated = seatTranscriptOf(id);
			if (stated === null) { return; }
			try {
				running.set(id, await subagents.forSeat(id, stated.transcriptPath));
			} catch {
			}
		})
	);
	subagents.dropUntouched();

	let alanPrincipalCount = 0;
	for (const row of rows) { if (row.principal === ALAN) { alanPrincipalCount++; } }

	const places = readSeatPlaces(rows);
	const roots = assembleForest(rows, liveIds, running, places, workingColour());
	return { roots, alanPrincipalCount, runningCount: countRunning(roots) };
}

const WORKING = 'working';

function workingColour(): string | undefined {
	return colorOfState(WORKING) ?? undefined;
}

export function countRunning(nodes: readonly AgentNode[]): number {
	let total = 0;
	for (const node of nodes) {
		if (node.live) { total++; }
		total += countRunning(node.children);
	}
	return total;
}

export function assembleForest(
	rows: readonly SeatRow[],
	liveIds: ReadonlySet<string>,
	subagentsBySeat: ReadonlyMap<string, readonly SubagentNode[]>,
	places: ReadonlyMap<string, SeatMode>,
	drawnWorking?: string
): readonly AgentNode[] {
	const present = new Set(rows.map((r) => r.id));
	const childrenByParent = new Map<string, SeatRow[]>();
	const roots: SeatRow[] = [];
	for (const row of rows) {
		const parent = row.parent_agent_id;
		if (row.principal !== ALAN && parent !== null && parent !== row.id && present.has(parent)) {
			const siblings = childrenByParent.get(parent);
			if (siblings === undefined) { childrenByParent.set(parent, [row]); }
			else { siblings.push(row); }
		} else {
			roots.push(row);
		}
	}

	const build = (row: SeatRow, visited: ReadonlySet<string>): AgentNode => {
		const seen = new Set(visited).add(row.id);
		const seats = (childrenByParent.get(row.id) ?? [])
			.filter((c) => !seen.has(c.id))
			.map((c) => build(c, seen))
			.filter(holdsSomethingRunning);
		const subagents = (subagentsBySeat.get(row.id) ?? []).map((one) => toAgentNode(one, drawnWorking));
		return {
			id: row.id,
			name: row.name ?? row.id,
			kind: 'seat',
			live: liveIds.has(row.id),
			place: places.get(row.id) ?? 'headless',
			state: row.state ?? undefined,
			waitingOn: row.waitingOn ?? undefined,
			colour: row.colour ?? undefined,
			children: [...sortByName(seats), ...subagents],
		};
	};

	return sortByName(roots.map((r) => build(r, new Set())).filter(holdsSomethingRunning));
}

function toAgentNode(node: SubagentNode, drawnWorking: string | undefined): AgentNode {
	return {
		id: node.key,
		name: node.label,
		kind: 'subagent',
		live: true,
		state: WORKING,
		colour: drawnWorking,
		children: node.children.map((child) => toAgentNode(child, drawnWorking)),
	};
}

function holdsSomethingRunning(node: AgentNode): boolean {
	return node.live || node.children.some(holdsSomethingRunning);
}

function sortByName(nodes: readonly AgentNode[]): readonly AgentNode[] {
	return [...nodes].sort((a, b) => a.name.localeCompare(b.name));
}
