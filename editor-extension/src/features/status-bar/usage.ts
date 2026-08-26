/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * The status bar's two cross-account usage means, read from the page query service.
 *
 * WHY THIS IS NOT THE SNAPSHOT'S `usage` FIELD. The two leftmost items used to read
 * `s.usage.sessionPct` / `s.usage.weeklyPct` off the consolidated snapshot RPC. Nothing
 * writes those database rows any more — the daemon that did now writes account state to
 * files — so the snapshot carries whatever mean was last written and carries it forever.
 * The bar showed a plausible number that could not move, which is the failure mode a
 * blank would at least have reported. The pages are the source now, and the page query
 * service is what reduces them, exactly as the iOS usage widget's endpoint already does
 * (`app/routes/api.claude-usage.ts` in the web package — this file is modelled on it,
 * including the ask ceiling and the schema parse).
 *
 * NEVER 0% FOR AN ABSENT READING. The route this is modelled on maps an answer covering
 * no accounts (`over` null or 0) to a value of `0`, which suits a widget that wants a
 * number. Here it would be a lie of exactly the kind this file exists to end: `0%` reads
 * as "nothing used", so an outage would render as the healthiest possible bar. Every
 * absent, empty or unreadable reading becomes `null`, which `formatUsagePct` draws as an
 * em dash. There is no path through this file that turns a failure into a zero.
 *
 * WHY A TOTAL FAILURE THROWS RATHER THAN RETURNING TWO NULLS. `render.ts` already has the
 * behaviour an outage wants: a rejected read marks its section stale and RETAINS the
 * items' last values, so the bar keeps the last mean it actually saw and says in the
 * tooltip how old it is. Returning two nulls instead would blank both items to em dashes
 * and throw away a reading that was true minutes ago. So the two levels are kept apart:
 *
 *   - NEITHER query answered → throw. The service is down; the section goes stale and
 *     holds its last values.
 *   - AT LEAST ONE answered → resolve. The one that answered renders fresh; the one that
 *     did not renders an em dash.
 *
 * That split is also what keeps "no accounts answered" distinguishable from "the service
 * is down": the first is a fresh em dash, the second a retained value marked stale.
 */

import { z } from 'zod';

// The service as it is reachable from this workstation. The web route names the
// cluster-internal origin instead; the editor runs outside the cluster, so it takes the
// forwarded local port. Same service, same `/q/<slug>` route, same answer shape.
export const PAGE_QUERY_ORIGIN = 'http://127.0.0.1:8787';

export const MEAN_WEEKLY_USED = 'claude-accounts-mean-weekly-used';
export const MEAN_SESSION_USED = 'claude-accounts-mean-session-used';

// The bar polls every 5s, so an ask that outlives its own poll is worse than no ask.
// Well under the poll interval, and under the web route's 5s for the same reason.
const ASK_CEILING_MS = 3_000;

// The service's answer envelope. `value` is the reduced number and `over` is how many
// pages it was reduced over. Both nullable and both defaulted, so an answer that omits
// them parses into the same shape a null would rather than failing the read.
const AnswerSchema = z.object({
	n: z.number(),
	value: z.number().nullable().default(null),
	over: z.number().nullable().default(null),
});

export type QueryAnswer = z.infer<typeof AnswerSchema>;

// What the two usage slots read. `null` is "no reading", drawn as an em dash — never 0.
export type UsageReading = {
	readonly sessionPct: number | null;
	readonly weeklyPct: number | null;
};

// One query's outcome. `ok: true` with a null `pct` is the service ANSWERING that it has
// no accounts to average — a fresh em dash. `ok: false` is the query not answering at
// all, which is what the two-level rule above counts.
type Reading =
	| { readonly ok: true; readonly pct: number | null }
	| { readonly ok: false; readonly why: string };

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>;

// Ask one named query and reduce its answer to a percent or a null. Every failure path
// returns a `why` rather than throwing, so one query's absence cannot take the other's
// answer down with it.
export async function askMean(slug: string, fetcher: Fetcher): Promise<Reading> {
	const url = `${PAGE_QUERY_ORIGIN}/q/${slug}`;
	let response: Response;
	try {
		response = await fetcher(url, {
			headers: { accept: 'application/json' },
			signal: AbortSignal.timeout(ASK_CEILING_MS),
		});
	} catch (cause) {
		return {
			ok: false,
			why: `${slug} went unasked: ${url} gave no answer within ${ASK_CEILING_MS}ms (${String(cause)})`,
		};
	}
	if (!response.ok) {
		return {
			ok: false,
			why: `${slug} went unanswered: the page query service replied ${response.status}`,
		};
	}
	let body: unknown;
	try {
		body = await response.json();
	} catch (cause) {
		return { ok: false, why: `${slug} replied with what is not JSON (${String(cause)})` };
	}
	const read = AnswerSchema.safeParse(body);
	if (!read.success) {
		return { ok: false, why: `${slug} replied in a shape this reader cannot read: ${read.error.message}` };
	}
	const { value, over } = read.data;
	// No accounts answered. The web route calls this 0; here it is a dash. A bar reading
	// `0%` because nothing reported is the whole defect this file was written to remove.
	if (over === null || over === 0) { return { ok: true, pct: null }; }
	// A mean taken over pages that carried no number. Nothing to draw, so a dash.
	if (value === null) { return { ok: true, pct: null }; }
	// Returned unrounded: `formatUsagePct` floors it, matching the `cu` CLI's avg row.
	// Rounding here as well would floor a rounded number and land a percent off.
	return { ok: true, pct: value };
}

// Both means, asked together. Throws only when NEITHER query answered — see the header:
// that is the outage case, and throwing is what buys the retain-last-value behaviour in
// `render.ts`. Anything less than a total outage resolves, so the query that answered
// renders its own fresh number.
export async function readUsage(fetcher: Fetcher = fetch): Promise<UsageReading> {
	const [session, weekly] = await Promise.all([
		askMean(MEAN_SESSION_USED, fetcher),
		askMean(MEAN_WEEKLY_USED, fetcher),
	]);
	if (!session.ok && !weekly.ok) {
		throw new Error(`the page query service answered neither usage query — ${session.why}; ${weekly.why}`);
	}
	return {
		sessionPct: session.ok ? session.pct : null,
		weeklyPct: weekly.ok ? weekly.pct : null,
	};
}
