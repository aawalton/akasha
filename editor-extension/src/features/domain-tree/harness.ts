import * as path from 'node:path';
import { duringOneCall } from '../../../../during-call/during-call.ts';
import { askedDomainRows } from '../../../../tools/lib/champions-asked.ts';
import { championTree } from '../../../../tools/lib/champions-tree.ts';
import { AKASHA, resolveRoots, rootFor } from '../../../../repo/roots/roots.ts';

export interface DomainNode {
	readonly slug: string;
	readonly relPath: string;
	readonly persona: string | null;
	readonly position: number | null;
	readonly children: readonly DomainNode[];
}

export interface DomainTree {
	readonly repo: string;
	readonly roots: readonly DomainNode[];
	readonly unreached: readonly string[];
}

export function countDomains(nodes: readonly DomainNode[]): number {
	let total = 0;
	for (const node of nodes) {
		total += 1 + countDomains(node.children);
	}
	return total;
}

export function documentPath(tree: DomainTree, node: DomainNode): string {
	return path.join(tree.repo, node.relPath);
}

export async function readDomainTree(): Promise<DomainTree> {
	const roots = resolveRoots();
	return duringOneCall(async () => {
		const { roots: composed, unreached } = championTree(askedDomainRows(roots));
		return { repo: rootFor(roots, AKASHA), roots: composed, unreached };
	});
}
