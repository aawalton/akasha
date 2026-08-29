import * as path from 'node:path';
import { duringOneCall } from '../../../../during-call/during-call.ts';
import { type Initiatives, type Node, workTree } from '../../../../tools/lib/work-tree.ts';
import { initiativesDrawn } from '../../../../akasha/editor-extension/work-initiatives/work-initiatives.module.code.ts';
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

function initiativesIn(repo: string): Initiatives {
	return {
		initiatives: initiativesDrawn(repo).map((one) => ({
			slug: one.slug,
			relPath: one.path,
			parent: one.parent,
			persona: null,
		})),
	};
}

export async function readWorkTree(): Promise<WorkTree> {
	const repo = rootFor(resolveRoots(), AKASHA);
	return duringOneCall(async () => ({
		repo,
		roots: rollUp(named(workTree(initiativesIn(repo), drawnNow()))),
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
