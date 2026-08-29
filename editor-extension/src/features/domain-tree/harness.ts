import * as path from 'node:path';
import { duringOneCall } from '../../../../during-call/during-call.ts';
import { domainsDrawn } from '../../../../akasha/editor-extension/panel-domains/panel-domains.module.code.ts';
import { type DomainRow, championTree } from '../../../../tools/lib/champions-tree.ts';
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

function domainRowsIn(repo: string): readonly DomainRow[] {
	return domainsDrawn(repo).map((one) => ({
		slug: one.slug,
		relPath: one.path,
		persona: null,
		parent: one.parent,
		sequence: one.sequence,
	}));
}

export async function readDomainTree(): Promise<DomainTree> {
	const repo = rootFor(resolveRoots(), AKASHA);
	return duringOneCall(async () => {
		const { roots: composed, unreached } = championTree(domainRowsIn(repo));
		return { repo, roots: composed, unreached };
	});
}
