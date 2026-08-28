import { askHere } from '../../../../readouts/ask-here.ts';
import type { Ask } from '../../../../readouts/readout-resolver.ts';

export const MEAN_WEEKLY_USED = 'claude-accounts-mean-weekly-used';
export const MEAN_SESSION_USED = 'claude-accounts-mean-session-used';

export type UsageReading = {
	readonly sessionPct: number | null;
	readonly weeklyPct: number | null;
};

type Reading =
	| { readonly ok: true; readonly pct: number | null }
	| { readonly ok: false; readonly why: string };

export async function askMean(slug: string, ask: Ask): Promise<Reading> {
	let answer: Awaited<ReturnType<Ask>>;
	try {
		answer = await ask(slug, {});
	} catch (cause) {
		return { ok: false, why: `${slug} went unasked: ${String(cause)}` };
	}
	const { value, over } = answer;
	if (over === null || over === 0) { return { ok: true, pct: null }; }
	if (value === null) { return { ok: true, pct: null }; }
	return { ok: true, pct: value };
}

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
