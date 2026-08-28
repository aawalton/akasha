import * as path from 'node:path';
import { z } from 'zod';
import { duringOneCall } from '../../../../during-call/during-call.ts';
import { askHere } from '../../../../readouts/ask-here.ts';
import type { Ask } from '../../../../readouts/readout-resolver.ts';
import { akashaRoot } from '../../harness-call.ts';
import { type PageAnswers, type PageNode, type PageTree, type QueryRow, assemblePageTree } from './assemble.ts';


export const TYPE_QUERIES: readonly string[] = ['page-type-all', 'rules-engine-rule-set-all'];
export const PROPERTY_QUERIES: readonly string[] = [
	'page-property-definition-all',
	'alan-harness-tracking-field-all',
];
export const PROPERTY_TYPE_QUERY = 'page-property-type-all';
export const DOMAIN_QUERY = 'domain-all';

const ROW_SCHEMA = z.object({
	at: z.string().min(1),
	values: z.record(z.string(), z.union([z.string(), z.array(z.string()), z.null()])),
});

const ANSWER_SCHEMA = z.object({
	n: z.number(),
	rows: z.array(ROW_SCHEMA),
});

export function parseAnswer(body: unknown, slug: string): readonly QueryRow[] {
	const read = ANSWER_SCHEMA.safeParse(body);
	if (!read.success) {
		throw new Error(`the page query \`${slug}\` answered in a shape this cannot read: ${read.error.message}`);
	}
	return read.data.rows;
}

export function countRows(nodes: readonly PageNode[]): number {
	let total = 0;
	for (const node of nodes) {
		total += 1 + countRows(node.children);
	}
	return total;
}

export function countPages(nodes: readonly PageNode[]): number {
	let total = 0;
	for (const node of nodes) {
		total += (node.at === null ? 0 : 1) + countPages(node.children);
	}
	return total;
}

export function documentPath(tree: PageTree, node: PageNode): string | undefined {
	if (node.at === null) { return undefined; }
	const cut = node.at.indexOf(':');
	const root = rootOfRepo(node.at.slice(0, cut));
	return root === undefined ? undefined : path.join(root, node.at.slice(cut + 1));
}

function rootOfRepo(repo: string): string | undefined {
	if (repo === 'akasha') { return akashaRoot(); }
	return undefined;
}

export async function askQuery(slug: string, ask: Ask): Promise<readonly QueryRow[]> {
	let answer: Awaited<ReturnType<Ask>>;
	try {
		answer = await ask(slug, {});
	} catch (cause) {
		throw new Error(`${slug} went unasked: ${String(cause)}`);
	}
	return parseAnswer(answer, slug);
}

export async function readPageTree(ask: Ask = askHere()): Promise<PageTree> {
	return duringOneCall(async () => {
		const slugs = [...TYPE_QUERIES, ...PROPERTY_QUERIES, PROPERTY_TYPE_QUERY, DOMAIN_QUERY];
		const answered = await Promise.all(slugs.map(async (slug) => askQuery(slug, ask)));
		const at = (slug: string): readonly QueryRow[] => answered[slugs.indexOf(slug)] ?? [];
		const answers: PageAnswers = {
			types: TYPE_QUERIES.flatMap((slug) => [...at(slug)]),
			properties: PROPERTY_QUERIES.flatMap((slug) => [...at(slug)]),
			propertyTypes: at(PROPERTY_TYPE_QUERY),
			domains: at(DOMAIN_QUERY),
		};
		return assemblePageTree(answers, akashaRoot());
	});
}
