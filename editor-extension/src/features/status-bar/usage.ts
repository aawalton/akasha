import { runVerb, verbPath } from '../../harness-call.ts';

const CALL_TIMEOUT_MS = 30_000;

const MAX_BUFFER = 1024 * 1024;

const VERB = 'claude-usage';

export type Mean = {
	readonly value: number | null;
	readonly over: number;
};

export type UsageReading = {
	readonly sessionPct: number | null;
	readonly weeklyPct: number | null;
};

// A mean taken over no account is no percentage rather than zero, and the slot draws `—` for it.
function pctOf(mean: Mean): number | null {
	return mean.over === 0 ? null : mean.value;
}

function meanIn(held: Record<string, unknown>, field: string): Mean {
	const raw = held[field];
	if (raw === null || typeof raw !== 'object') {
		throw new Error(`${VERB}: the answer carries no \`${field}\` mean`);
	}
	const one = raw as Record<string, unknown>;
	if (typeof one.over !== 'number') {
		throw new Error(`${VERB}: \`${field}.over\` is not a number, so nothing says how many accounts were read`);
	}
	if (one.value !== null && typeof one.value !== 'number') {
		throw new Error(`${VERB}: \`${field}.value\` is neither a number nor null`);
	}
	return { value: one.value as number | null, over: one.over };
}

// ASKED AS A CHILD RATHER THAN READ HERE. `readFleetUsage` loads each account's page body and a
// body is loaded with `Bun.Transpiler`, which the node extension host does not carry. Reading it
// in this process threw every poll, `Promise.allSettled` in `activate.ts` swallowed the throw, and
// both slots drew `—` with "no successful poll yet" while activation reported clean. The work tree
// and the page tree ask their children for exactly this reason.
//
// This throws where the fleet cannot be read rather than answering two nulls, because both slots
// draw `—` for a null and a checkout that will not answer would look like a fleet standing idle.
export async function readUsage(): Promise<UsageReading> {
	const stdout = await runVerb(verbPath(VERB), [], {
		timeout: CALL_TIMEOUT_MS,
		maxBuffer: MAX_BUFFER,
	});
	let answered: unknown;
	try {
		answered = JSON.parse(stdout);
	} catch (err) {
		throw new Error(`${VERB} did not print JSON: ${String(err)}`);
	}
	if (answered === null || typeof answered !== 'object') {
		throw new Error(`${VERB}: the answer is not an object, so it names no figure at all`);
	}
	const held = answered as Record<string, unknown>;
	return {
		sessionPct: pctOf(meanIn(held, 'session')),
		weeklyPct: pctOf(meanIn(held, 'weekly')),
	};
}
