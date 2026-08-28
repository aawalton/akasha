/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import type { Observation, SweepObservation } from './observations.ts';

/**
 * What a feature reports, which is everything an `Observation` holds except when.
 *
 * `at` is the store's to stamp, and only at the moment something else moved.
 */
export type ObservationPatch = Omit<Observation, 'at'>;

/**
 * One feature's observation with a patch merged over it.
 *
 * SHALLOW AND BY PRESENT KEY, so a feature can report the parts it knows at the
 * moment it knows them without restating the rest. `agent-tree` learns its sweep
 * and its forest counts from two different reads; neither should erase the other.
 *
 * A KEY CARRYING `undefined` IS DROPPED RATHER THAN APPLIED. This repository
 * compiles with `exactOptionalPropertyTypes` off, so `{ sweep: undefined }`
 * typechecks against `ObservationPatch` — and spread would then blank a sweep the
 * feature never meant to touch, which is the silent kind of wrong this whole
 * record exists to stop. Clearing a field is not something any caller needs, so
 * it is unavailable rather than merely discouraged.
 */
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
	// COUNTS MERGE BY NAME WHERE EVERYTHING ELSE REPLACES, because a feature counts
	// different things at different moments: `agent-tree` learns its sweep counts in
	// `sampleColumns` and its forest counts in the read after it, and replacing would
	// mean each poll erased the other's half. The alternative is every caller
	// restating counts it did not measure, which is the version that goes stale.
	if (patch.counts !== undefined && before.counts !== undefined) {
		merged.counts = { ...before.counts, ...patch.counts };
	}
	// `outcome` AND `failure` MOVE TOGETHER, so a patch carrying an outcome takes its
	// failure from the patch rather than inheriting one. Shallow merge alone would
	// leave the last failure sitting beside a fresh `ok`, and a feature that broke
	// once and recovered would read as broken for the life of the window — a
	// verifier's wrong answer rather than a missing one.
	if (patch.outcome !== undefined && patch.failure === undefined) {
		delete merged.failure;
	}
	return merged;
}

/**
 * This sweep folded into what the window has seen, carrying the worst forward.
 *
 * The counts are replaced because they describe the sweep that just ran; the
 * worst is kept because it describes the window. See `SweepObservation.worstMs`
 * for why that asymmetry is the point rather than an inconsistency.
 */
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
