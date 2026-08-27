/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * The status bar's two cross-account usage means, answered off the pages on this machine.
 *
 * WHY THIS IS NOT THE SNAPSHOT'S `usage` FIELD. The two leftmost items used to read
 * `s.usage.sessionPct` / `s.usage.weeklyPct` off the consolidated snapshot RPC. Nothing
 * writes those database rows any more — the daemon that did now writes account state to
 * files — so the snapshot carried whatever mean was last written and carried it forever.
 * The bar showed a plausible number that could not move, which is the failure mode a
 * blank would at least have reported. The pages are the source now.
 *
 * WHY IT NO LONGER REACHES THE PAGE QUERY SERVICE. It did, with a 3s ceiling, and the
 * ceiling was the whole problem: the service answers on one thread for every caller on
 * the workstation, and these two queries measured tens of seconds behind that queue while
 * costing a few hundred milliseconds to answer directly. `askHere` answers them here.
 *
 * NEVER 0% FOR AN ABSENT READING. The iOS usage route this was modelled on maps an answer
 * covering no accounts (`over` null or 0) to a value of `0`, which suits a widget that
 * wants a number. Here it would be a lie of exactly the kind this file exists to end: `0%`
 * reads as "nothing used", so an outage would render as the healthiest possible bar. Every
 * absent, empty or unreadable reading becomes `null`, which `formatUsagePct` draws as an
 * em dash. There is no path through this file that turns a failure into a zero.
 *
 * WHY A TOTAL FAILURE THROWS RATHER THAN RETURNING TWO NULLS. `render.ts` already has the
 * behaviour an outage wants: a rejected read marks its section stale and RETAINS the
 * items' last values, so the bar keeps the last mean it actually saw and says in the
 * tooltip how old it is. Returning two nulls instead would blank both items to em dashes
 * and throw away a reading that was true minutes ago. So the two levels are kept apart:
 *
 *   - NEITHER query answered → throw. The section goes stale and holds its last values.
 *   - AT LEAST ONE answered → resolve. The one that answered renders fresh; the one that
 *     did not renders an em dash.
 *
 * That split is also what keeps "no accounts answered" distinguishable from "the read
 * failed": the first is a fresh em dash, the second a retained value marked stale.
 */

import { askHere } from '../../../../readouts/ask-here.ts';
import type { Ask } from '../../../../readouts/readout-resolver.ts';

export const MEAN_WEEKLY_USED = 'claude-accounts-mean-weekly-used';
export const MEAN_SESSION_USED = 'claude-accounts-mean-session-used';

// What the two usage slots read. `null` is "no reading", drawn as an em dash — never 0.
export type UsageReading = {
	readonly sessionPct: number | null;
	readonly weeklyPct: number | null;
};

// One query's outcome. `ok: true` with a null `pct` is the query ANSWERING that it has
// no accounts to average — a fresh em dash. `ok: false` is the query not answering at
// all, which is what the two-level rule above counts.
type Reading =
	| { readonly ok: true; readonly pct: number | null }
	| { readonly ok: false; readonly why: string };

// Ask one named query and reduce its answer to a percent or a null. A refusal returns a
// `why` rather than throwing, so one query's absence cannot take the other's answer down.
export async function askMean(slug: string, ask: Ask): Promise<Reading> {
	let answer: Awaited<ReturnType<Ask>>;
	try {
		answer = await ask(slug, {});
	} catch (cause) {
		return { ok: false, why: `${slug} went unasked: ${String(cause)}` };
	}
	const { value, over } = answer;
	// No accounts answered. The iOS route calls this 0; here it is a dash. A bar reading
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
export async function readUsage(ask: Ask = askHere()): Promise<UsageReading> {
	const [session, weekly] = await Promise.all([
		askMean(MEAN_SESSION_USED, ask),
		askMean(MEAN_WEEKLY_USED, ask),
	]);
	if (!session.ok && !weekly.ok) {
		throw new Error(`neither usage query answered — ${session.why}; ${weekly.why}`);
	}
	return {
		sessionPct: session.ok ? session.pct : null,
		weeklyPct: weekly.ok ? weekly.pct : null,
	};
}
