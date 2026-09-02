import * as path from 'node:path';
import { runVerb, verbPath } from '../../harness-call.ts';

const CALL_TIMEOUT_MS = 30_000;

const MAX_BUFFER = 16 * 1024 * 1024;

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

function nodeIn(raw: unknown, at: string): DomainNode {
	if (raw === null || typeof raw !== 'object') {
		throw new Error(`domain-tree: ${at} is not an object`);
	}
	const row = raw as Record<string, unknown>;
	if (typeof row.slug !== 'string' || row.slug === '') {
		throw new Error(`domain-tree: ${at} carries no slug, and a row with none is no domain`);
	}
	if (typeof row.relPath !== 'string' || row.relPath === '') {
		throw new Error(`domain-tree: ${at} carries no relPath, so nothing could be opened for it`);
	}
	const children = Array.isArray(row.children) ? row.children : [];
	return {
		slug: row.slug,
		relPath: row.relPath,
		persona: typeof row.persona === 'string' ? row.persona : null,
		position: typeof row.position === 'number' ? row.position : null,
		children: children.map((one, index) => nodeIn(one, `${at}.children[${index}]`)),
	};
}

export function readDomainTreeAnswer(answered: unknown): DomainTree {
	if (answered === null || typeof answered !== 'object') {
		throw new Error('domain-tree: the answer is not an object, so it names no domain at all');
	}
	const held = answered as Record<string, unknown>;
	if (typeof held.repo !== 'string' || held.repo === '') {
		throw new Error('domain-tree: the answer names no repo, so no path could be joined against it');
	}
	if (!Array.isArray(held.roots)) {
		throw new Error('domain-tree: the answer carries no `roots` array');
	}
	const unreached = Array.isArray(held.unreached)
		? held.unreached.filter((one): one is string => typeof one === 'string')
		: [];
	return {
		repo: held.repo,
		roots: held.roots.map((one, index) => nodeIn(one, `roots[${index}]`)),
		unreached,
	};
}

export async function readDomainTree(): Promise<DomainTree> {
	const stdout = await runVerb(verbPath('domain-tree'), [], {
		timeout: CALL_TIMEOUT_MS,
		maxBuffer: MAX_BUFFER,
	});
	let answered: unknown;
	try {
		answered = JSON.parse(stdout);
	} catch (err) {
		throw new Error(`domain-tree did not print JSON: ${String(err)}`);
	}
	return readDomainTreeAnswer(answered);
}
