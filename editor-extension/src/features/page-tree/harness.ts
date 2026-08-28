/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The page type tree and the property type vocabulary, ASKED FOR as rows of named page queries.
 *
 * WHY THIS FILE NO LONGER SPAWNS `ops`. It used to run `ops instructions pages --json` and parse the
 * tree that command composed, which made the editor a caller of another repository's CLI. The facts
 * are asked as named page queries now and `assemble.ts` nests them.
 *
 * WHY IT NO LONGER REACHES THE SERVICE OVER HTTP. It did, with a 60s ceiling, and it was recorded
 * failing on `page-type-all` at that full minute. The service answers on one thread for every caller
 * on the workstation; these six asks cost a few hundred milliseconds each answered directly. The
 * standing intent on the service is that nothing OFF the workstation reads a page except through it,
 * and the editor is on it.
 *
 * NAMED RATHER THAN COMPOSED, as `pages/page-type/page-query.md` intends: "A product names a page
 * query rather than composing one." All six stand as pages under `pages/page-query/` in the akasha
 * repository, so what this asks is reviewable there rather than only here.
 *
 * PARSED RATHER THAN CAST. The boundary moved — a query envelope now rather than a tree — but the
 * reason did not: a service that changed underneath us should arrive as a message in the output
 * channel, not as a tree half-built out of `undefined`.
 */

import * as path from 'node:path';
import { z } from 'zod';
import { askHere } from '../../../../readouts/ask-here.ts';
import type { Ask } from '../../../../readouts/readout-resolver.ts';
import { akashaRoot } from '../../harness-call.ts';
import { type PageAnswers, type PageNode, type PageTree, type QueryRow, assemblePageTree } from './assemble.ts';


/**
 * The six queries, and which of the four things each answers.
 *
 * TWO PAIRS ARE MERGED because a page type is anything whose own page type REACHES `page-type`, and
 * a query names one page type without expanding into its subtypes. See `assemble.ts` for what that
 * costs and for the failure mode it leaves standing.
 */
export const TYPE_QUERIES: readonly string[] = ['page-type-all', 'rules-engine-rule-set-all'];
export const PROPERTY_QUERIES: readonly string[] = [
	'page-property-definition-all',
	'alan-harness-tracking-field-all',
];
export const PROPERTY_TYPE_QUERY = 'page-property-type-all';
/**
 * Every domain, filtered to the kind documents once it arrives.
 *
 * ALL OF THEM BECAUSE THE LANGUAGE HAS NO PREFIX TEST. `pages/domain/page-query-language.md` keeps
 * the predicates deliberately few, and none of them matches a slug's opening. Measured: 617 rows and
 * 56,890 bytes to fill a five-entry map, alongside the 443KB the property definitions already carry,
 * and all six asks run together.
 */
export const DOMAIN_QUERY = 'domain-all';

/**
 * The answer envelope, narrowed to what this reads. `at` is the only place a path comes from: a
 * query answers `<repo>:<path inside it>`, and that is how a row says which document it stands for.
 */
const ROW_SCHEMA = z.object({
	at: z.string().min(1),
	values: z.record(z.string(), z.union([z.string(), z.array(z.string()), z.null()])),
});

const ANSWER_SCHEMA = z.object({
	n: z.number(),
	rows: z.array(ROW_SCHEMA),
});

/** The rows the service answered with, or a stated reason the answer is not usable. */
export function parseAnswer(body: unknown, slug: string): readonly QueryRow[] {
	const read = ANSWER_SCHEMA.safeParse(body);
	if (!read.success) {
		throw new Error(`the page query \`${slug}\` answered in a shape this cannot read: ${read.error.message}`);
	}
	return read.data.rows;
}

/**
 * How many rows the tree holds, of every kind.
 *
 * WHAT THE COUNT BESIDE THE TITLE HAS TO BE, for the reason the Work panel states of its own.
 * The filter matches on any row's own text, so the number it leaves standing counts the scaffolding
 * rows alongside the ones that open a document. Counting only the latter against it would put a
 * matched row over a total that never contained it — the two roots are themselves such rows, and a
 * reader typing `property` would be told "1 of" a total that row is not in.
 */
export function countRows(nodes: readonly PageNode[]): number {
	let total = 0;
	for (const node of nodes) {
		total += 1 + countRows(node.children);
	}
	return total;
}

/**
 * How many rows stand for a document, as against scaffolding that opens nothing.
 *
 * SEPARATE FROM THE COUNT BESIDE THE TITLE, and reported into the output channel instead. The two
 * answer different questions: `countRows` says how many rows were drawn, which is what a filter's
 * number has to be held against, and this says how many of them a reader can open. That second
 * question is a real one — it is how many pages there are rather than the size of the drawing — but
 * it is not the one the title bar is asking.
 */
export function countPages(nodes: readonly PageNode[]): number {
	let total = 0;
	for (const node of nodes) {
		total += (node.at === null ? 0 : 1) + countPages(node.children);
	}
	return total;
}

/**
 * The absolute path of a row's document, or undefined where the row is scaffolding and has none.
 *
 * Joined against the root of the repository the row itself names, so a row this can place opens from
 * that repository's own root. `tree` is taken for the shape the three panels share and for a
 * repository this cannot place.
 */
export function documentPath(tree: PageTree, node: PageNode): string | undefined {
	if (node.at === null) { return undefined; }
	const cut = node.at.indexOf(':');
	const root = rootOfRepo(node.at.slice(0, cut));
	return root === undefined ? undefined : path.join(root, node.at.slice(cut + 1));
}

/**
 * The root of a repository a row names, or undefined where this knows no such repository.
 *
 * HERE RATHER THAN IN `harness-call.ts` because the page tree is the only reader that meets a
 * repository name at all: the other two panels are answered by one repository each.
 *
 * ONE REPOSITORY ANSWERS NOW. `instructions`, `memory`, `books` and `stories` were absorbed into
 * akasha and their checkouts are gone, so a row naming one of them is a row this cannot place.
 * Undefined says so, where the roots that used to answer them would have built a path into a
 * directory that is not there — a row drawn with an open command that fails on the click.
 */
function rootOfRepo(repo: string): string | undefined {
	if (repo === 'akasha') { return akashaRoot(); }
	return undefined;
}

/**
 * Ask one named query and answer its rows.
 *
 * EVERY FAILURE IS A THROW, unlike the status bar's reader beside it. That panel draws two numbers
 * and can lose one and keep the other; this builds one tree out of six answers, so half an answer is
 * a wrong tree rather than a smaller one, with every type that defines a property drawn bare.
 */
export async function askQuery(slug: string, ask: Ask): Promise<readonly QueryRow[]> {
	let answer: Awaited<ReturnType<Ask>>;
	try {
		answer = await ask(slug, {});
	} catch (cause) {
		throw new Error(`${slug} went unasked: ${String(cause)}`);
	}
	return parseAnswer(answer, slug);
}

/**
 * The tree, from the service.
 *
 * EVERY ASK TOGETHER, because no answer is usable without the rest and running them in turn would
 * pay every latency for no gain.
 */
export async function readPageTree(ask: Ask = askHere()): Promise<PageTree> {
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
}
