/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview What each feature observed, as a file an agent outside the editor can read.
 *
 * WHY THIS EXISTS. A criterion about what an extension did could be settled only
 * by Alan opening an output channel and reading it out. Six channels — `Ops`,
 * `Ops: Agent Tree`, `Ops: Status Bar` and three more — carry the sweep counts,
 * the sweep timing, the rename decisions and the refresh failures between them,
 * and every line of it dies in his window. A file on disk is what a verifier
 * holding a shell can read instead.
 *
 * ONE RECORD FOR ALL THE FEATURES rather than one each. All seven run in a single
 * extension host, so a shared file has one writer and needs no cross-process
 * story. A verifier holding a per-feature file cannot tell "this feature observed
 * nothing" from "this feature never activated", where a `features` map with the
 * activation outcomes in it makes an absence mean something. And the cost rule
 * below is bought once here rather than six times.
 *
 * NO TIMESTAMP EVER DRIVES A WRITE, which is the rule the whole shape is built
 * around and the reason `changeKey` exists. See it there.
 *
 * NOTHING HERE IMPORTS `vscode` OR `node:`. The shaping, the change detection and
 * the reads are exercised under bun with no workbench; the writing is the
 * caller's, in `./observation-store.ts`.
 */
import { z } from 'zod';
import type { WindowIdentity } from './window-identity.ts';

/** The schema version, so a reader meeting a shape it does not know can say so. */
export const OBSERVATIONS_VERSION = 1;

/**
 * What one sweep of `Terminal.processId` found.
 *
 * THE TALLY IS WHAT ANSWERS THE QUESTION THE TIMING LOOKS LIKE IT ANSWERS.
 * `readProcessIds` races every terminal against ONE shared deadline, so an
 * outcome of `never answered` means that timer fired — which means the sweep ran
 * to the full bound. `neverAnswered > 0` is therefore exactly equivalent to "this
 * sweep paid `boundMs`", and unlike a duration it is a stable value: a healthy
 * window reports the same tally poll after poll and so writes nothing.
 *
 * `boundMs` rides along so the record is self-describing — a verifier reads what
 * the bound was without going to the source for it.
 */
export interface SweepObservation {
	readonly swept: number;
	readonly read: number;
	readonly noProcess: number;
	readonly neverAnswered: number;
	/** The bound this sweep was run against. */
	readonly boundMs: number;
	/**
	 * The slowest sweep this window has seen, and when and what triggered it.
	 *
	 * A HIGH-WATER MARK RATHER THAN THE LATEST READING, and that is the fifth
	 * criterion rather than a preference. `agent-tree` polls every ten seconds; a
	 * latest duration written verbatim differs on every poll — 312ms, then 308ms —
	 * so the record would be rewritten all day for a verifier who reads it twice.
	 * A high-water mark settles after the first few sweeps and then stops moving.
	 *
	 * It is also the better number. A window that paid the bound once at activation
	 * and has been healthy since reads as exactly that, where a latest reading would
	 * have shown only the healthy one and lost the event worth knowing about.
	 */
	readonly worstMs: number;
	readonly worstAt: string;
	readonly worstTrigger: string;
}

/** How a feature's last run ended. */
export type Outcome = 'ok' | 'failed';

/** How a feature's activation ended, in `startIsolated`'s own vocabulary. */
export type ActivationState = 'activated' | 'failed' | 'still running';

/**
 * What one feature observed.
 *
 * Every part is optional because features observe different things: a panel has
 * counts and an outcome, the two sweep sites have a sweep as well, and a feature
 * that only ever activated has just that. What is absent was never reported
 * rather than reported empty.
 */
export interface Observation {
	/**
	 * When anything below it last CHANGED — never when it was last observed.
	 *
	 * The difference is the whole cost story: stamped on observation this would
	 * move on every poll and defeat `changeKey` by itself.
	 */
	readonly at: string;
	readonly activation?: { readonly state: ActivationState; readonly ms: number };
	readonly outcome?: Outcome;
	/** Why the last run failed, where it did. Absent is not the same as succeeded. */
	readonly failure?: string;
	readonly sweep?: SweepObservation;
	/** Whatever this feature counts, by its own names. */
	readonly counts?: Readonly<Record<string, number>>;
}

export interface Observations {
	readonly version: number;
	/**
	 * The extension host process that wrote this — the window's identity as well as
	 * its liveness, which is one fact rather than two.
	 *
	 * THIS REPLACED A `session` READ FROM `vscode.env.sessionId`, and the reason is
	 * in `./window-identity.ts`: that value is a constant in every served instance
	 * of this fork, so a record keyed on it merged every served window into one
	 * file. Nothing here should reach for it again — it is not a window identity,
	 * and it reads exactly like one.
	 */
	readonly writer: number;
	/**
	 * When that process started, so a reused pid cannot make a record left behind by
	 * a killed window read as a live one.
	 */
	readonly writerStartedAt: number;
	readonly writtenAt: string;
	readonly features: Readonly<Record<string, Observation>>;
}

const SWEEP_SCHEMA = z.object({
	swept: z.number().int().min(0),
	read: z.number().int().min(0),
	noProcess: z.number().int().min(0),
	neverAnswered: z.number().int().min(0),
	boundMs: z.number().int().min(0),
	worstMs: z.number().int().min(0),
	worstAt: z.string(),
	worstTrigger: z.string(),
});

const OBSERVATION_SCHEMA = z.object({
	at: z.string(),
	activation: z
		.object({ state: z.enum(['activated', 'failed', 'still running']), ms: z.number() })
		.optional(),
	outcome: z.enum(['ok', 'failed']).optional(),
	failure: z.string().optional(),
	sweep: SWEEP_SCHEMA.optional(),
	counts: z.record(z.string(), z.number()).optional(),
});

const OBSERVATIONS_SCHEMA = z.object({
	version: z.number(),
	writer: z.number(),
	writerStartedAt: z.number(),
	writtenAt: z.string(),
	features: z.record(z.string(), OBSERVATION_SCHEMA),
});

/** A record parsed from disk, or nothing where the file is not one. */
export function parseObservations(raw: unknown): Observations | undefined {
	const parsed = OBSERVATIONS_SCHEMA.safeParse(raw);
	if (!parsed.success) { return undefined; }
	// A version this does not know is not read as if it were this one. Fields may
	// have changed meaning rather than merely been added.
	if (parsed.data.version !== OBSERVATIONS_VERSION) { return undefined; }
	return parsed.data;
}

export function buildObservations(input: {
	readonly writer: number;
	readonly writerStartedAt: number;
	readonly writtenAt: string;
	readonly features: Readonly<Record<string, Observation>>;
}): Observations {
	return { version: OBSERVATIONS_VERSION, ...input };
}

/** The window that wrote a record, in the shape `./window-identity.ts` compares. */
export function writerOf(record: Observations): WindowIdentity {
	return { pid: record.writer, startedAt: record.writerStartedAt };
}

/**
 * The window that wrote a file of ours OF ANY VERSION, for the sweep to judge.
 *
 * WHY THIS IS NOT `parseObservations`. That refuses a version it does not know,
 * which is right for a reader — the fields may have changed meaning — and wrong
 * for the sweep, because a record it cannot parse is one it will never remove. The
 * very first version keyed its file on `vscode.env.sessionId`, so every window
 * that ran it left a `someValue.sessionId.json` behind; without this they are
 * litter for good, and the directory a verifier globs never comes clean.
 *
 * RECOGNISED BY SHAPE, NARROWLY. A numeric `version`, a numeric `writer` and an
 * object of features together are specific enough that another tool's file is not
 * going to look like one by accident. Anything less certain is left alone.
 *
 * A record from before the start time existed answers zero, which
 * `isWindowLive` reads as "pid only" — the check that version actually had.
 */
export function writerOfAnyVersion(raw: unknown): WindowIdentity | undefined {
	if (raw === null || typeof raw !== 'object') { return undefined; }
	const record = raw as Record<string, unknown>;
	if (typeof record['version'] !== 'number') { return undefined; }
	if (typeof record['writer'] !== 'number') { return undefined; }
	const features = record['features'];
	if (features === null || typeof features !== 'object') { return undefined; }
	const startedAt = record['writerStartedAt'];
	return {
		pid: record['writer'],
		startedAt: typeof startedAt === 'number' ? startedAt : 0,
	};
}


/** Every `at` in the record, which is what must not be compared. */
const TIMESTAMP_KEYS = new Set(['at', 'worstAt']);

/**
 * A canonical string that changes only when something worth writing changed.
 *
 * THIS IS WHAT KEEPS AN UNWATCHED WINDOW FROM PAYING ANYTHING. Alan's editor runs
 * every waking hour against a verifier who reads this rarely, and `agent-tree`
 * polls every ten seconds — so a record written per tick is some 8,640 writes a
 * day for two readings. `tools/lib/supervisor-poll-tab-title.ts` in the
 * instructions repository carries the same fault and what it cost: an
 * unconditional write on a watched path fired a change event every beat for the
 * life of the seat.
 *
 * TIMESTAMPS ARE DROPPED, AND NOTHING ELSE IS. A timestamp moves on every
 * observation by construction, so one inside the comparison would make every
 * other stability in the shape pointless — the record would rewrite itself
 * forever over a field that only ever said "again". Dropping them is safe because
 * each one dates the value beside it: `worstAt` cannot move without `worstMs`
 * moving, and `at` is stamped by the store only where this key already differed.
 *
 * Keys are sorted so that a merge producing the same values in a different
 * insertion order is not mistaken for a change.
 */
export function changeKey(features: Readonly<Record<string, Observation>>): string {
	return JSON.stringify(features, (key, value: unknown) => {
		// The value has to be a string as well as the key one of the two, because
		// `counts` holds names a feature chose and one of them could be `at`. A count
		// is a number, so this drops the timestamps and cannot reach a count — where
		// matching on the name alone would have made a count called `at` the one
		// number in the record that could change without ever being written.
		if (TIMESTAMP_KEYS.has(key) && typeof value === 'string') { return undefined; }
		if (value === null || typeof value !== 'object' || Array.isArray(value)) { return value; }
		const sorted: Record<string, unknown> = {};
		for (const name of Object.keys(value as Record<string, unknown>).sort()) {
			sorted[name] = (value as Record<string, unknown>)[name];
		}
		return sorted;
	});
}

/** What one feature observed, or nothing where it never reported. */
export function observationFor(
	record: Observations,
	feature: string
): Observation | undefined {
	return record.features[feature];
}

/**
 * Every sweep in the record that paid its whole bound.
 *
 * The question #18954's second criterion asks, answered off the record rather
 * than off a duration: a sweep with `neverAnswered` above zero is one whose
 * shared deadline fired.
 */
export function sweepsPayingTheBound(record: Observations): readonly string[] {
	return Object.entries(record.features)
		.filter(([, o]) => o.sweep !== undefined && o.sweep.neverAnswered > 0)
		.map(([feature]) => feature);
}

/**
 * Whether a record still describes a live window.
 *
 * A silently stale record is worse than none, because the output channel it
 * replaces at least died visibly with the window. Between a reload and the
 * extension reactivating, the file on disk describes the window from before it
 * and nothing in the contents says so — the writer is the only thing that does.
 *
 * THE ANSWER IS ABOUT ONE WINDOW, WHICH IS THE HALF THAT WAS MISSING. A record
 * shared by two live windows passes this check and describes neither of them, so
 * this is worth nothing unless each window writes its own file. That is
 * `recordNameFor`'s job in `./window-identity.ts`, and it is the same fact: the
 * writer names the file and settles whether it is current.
 *
 * `isAlive` is passed in rather than called here so this stays free of `node:`
 * and testable; the caller supplies the process check.
 */
export function isLive(
	record: Observations,
	isAlive: (window: WindowIdentity) => boolean
): boolean {
	return isAlive(writerOf(record));
}
