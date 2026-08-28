import type { Observation, SweepObservation } from './observations.ts';

export type ObservationPatch = Omit<Observation, 'at'>;

export function mergeObservation(
	previous: Observation | undefined,
	patch: ObservationPatch,
	at: string
): Observation {
	const { at: _ignored, ...before } = previous ?? { at };
	const set = Object.fromEntries(
		Object.entries(patch).filter(([, value]) => value !== undefined)
	) as ObservationPatch;
	const merged: { -readonly [K in keyof Observation]: Observation[K] } = {
		...before,
		...set,
		at,
	};
	if (patch.counts !== undefined && before.counts !== undefined) {
		merged.counts = { ...before.counts, ...patch.counts };
	}
	if (patch.outcome !== undefined && patch.failure === undefined) {
		delete merged.failure;
	}
	return merged;
}

export function foldSweep(
	previous: SweepObservation | undefined,
	now: {
		readonly swept: number;
		readonly read: number;
		readonly noProcess: number;
		readonly neverAnswered: number;
		readonly boundMs: number;
		readonly ms: number;
		readonly at: string;
		readonly trigger: string;
	}
): SweepObservation {
	const beaten = previous === undefined || now.ms > previous.worstMs;
	return {
		swept: now.swept,
		read: now.read,
		noProcess: now.noProcess,
		neverAnswered: now.neverAnswered,
		boundMs: now.boundMs,
		worstMs: beaten ? now.ms : previous.worstMs,
		worstAt: beaten ? now.at : previous.worstAt,
		worstTrigger: beaten ? now.trigger : previous.worstTrigger,
	};
}
