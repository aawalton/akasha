import { SEAT_MODE_SCHEMA, type SeatMode } from '../../seat/mode.ts';
import type { AgentNode } from './forest.ts';
import type { HarnessRow } from './harness.ts';

export function readSeatPlaces(rows: readonly HarnessRow[]): ReadonlyMap<string, SeatMode> {
	const places = new Map<string, SeatMode>();
	for (const row of rows) {
		const stated = SEAT_MODE_SCHEMA.safeParse(row.mode);
		places.set(row.id, stated.success ? stated.data : 'interactive');
	}
	return places;
}

export function seatsByName(roots: readonly AgentNode[]): ReadonlyMap<string, AgentNode> {
	const found = new Map<string, AgentNode>();
	const walk = (nodes: readonly AgentNode[]): undefined => {
		for (const node of nodes) {
			if (node.kind === 'seat') { found.set(node.name, node); }
			walk(node.children);
		}
		return undefined;
	};
	walk(roots);
	return found;
}

export function ancestorNames(roots: readonly AgentNode[], id: string): readonly string[] {
	const found: string[] = [];
	const walk = (node: AgentNode, trail: readonly string[]): boolean => {
		if (node.id === id) {
			found.push(...trail);
			return true;
		}
		const below = [node.name, ...trail];
		for (const child of node.children) {
			if (walk(child, below)) { return true; }
		}
		return false;
	};
	for (const root of roots) {
		if (walk(root, [])) { break; }
	}
	return found;
}
