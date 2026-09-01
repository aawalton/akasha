import { type Mean, readFleetUsage } from '../../../../tools/lib/claude-account-usage.ts';

export type UsageReading = {
	readonly sessionPct: number | null;
	readonly weeklyPct: number | null;
};

// A mean taken over no account is no percentage rather than zero, and the slot draws `—` for it.
function pctOf(mean: Mean): number | null {
	return mean.over === 0 ? null : mean.value;
}

// Read from the checkout rather than asked of `claude-accounts-mean-session-used` and
// `claude-accounts-mean-weekly-used`, which reduce over two derived properties that went with the
// claude-account page type at `54ee772b64` and have answered `over: 0` since. The reasoning and
// what each figure means stand in `tools/lib/claude-account-usage.ts`.
//
// This throws where the fleet cannot be read rather than answering two nulls, because both slots
// draw `—` for a null and a checkout that will not answer would look like a fleet standing idle.
export async function readUsage(): Promise<UsageReading> {
	const usage = readFleetUsage();
	return { sessionPct: pctOf(usage.session), weeklyPct: pctOf(usage.weekly) };
}
