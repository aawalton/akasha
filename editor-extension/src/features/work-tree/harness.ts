import * as path from 'node:path';
import { duringOneCall } from '../../../../during-call/during-call.ts';
import { type Node, workTree } from '../../../../tools/lib/work-tree.ts';
import { askedInitiatives } from '../../../../tools/lib/work-tree-asked.ts';
import { drawnNow } from '../../../../tools/lib/work-tree-drawn.ts';
import { AKASHA, resolveRoots, rootFor } from '../../../../repo/roots/roots.ts';
import { rollUp } from './colours.ts';

export interface WorkNode {
	readonly key: string;
	readonly label: string;
	readonly relPath: string | null;
	readonly detail: string | null;
	readonly note: string | null;
	readonly colour: string | null;
	readonly children: readonly WorkNode[];
}

export interface WorkTree {
	readonly repo: string;
	readonly roots: readonly WorkNode[];
}

function named(nodes: readonly Node[]): readonly WorkNode[] {
	return nodes.map((node) => ({
		key: node.key,
		label: node.label,
		relPath: node.relPath,
		detail: node.detail,
		note: node.note,
		colour: node.color,
		children: named(node.children),
	}));
}

export function countRows(nodes: readonly WorkNode[]): number {
	let total = 0;
	for (const node of nodes) {
		total += 1 + countRows(node.children);
	}
	return total;
}

export function workKeys(nodes: readonly WorkNode[]): readonly string[] {
	return nodes.flatMap((node) => [node.key, ...workKeys(node.children)]);
}

export function documentPath(tree: WorkTree, node: WorkNode): string | undefined {
	return node.relPath === null ? undefined : path.join(tree.repo, node.relPath);
}

export async function readWorkTree(): Promise<WorkTree> {
	const roots = resolveRoots();
	return duringOneCall(async () => ({
		repo: rootFor(roots, AKASHA),
		roots: rollUp(named(workTree(askedInitiatives(roots), drawnNow()))),
	}));
}

export interface WorkColours {
	readonly repo: string;
	readonly byInitiative: Readonly<Record<string, string>>;
}

export async function readWorkColours(): Promise<WorkColours> {
	const roots = resolveRoots();
	return duringOneCall(async () => ({
		repo: rootFor(roots, AKASHA),
		byInitiative: Object.fromEntries(drawnNow().byInitiative),
	}));
}
