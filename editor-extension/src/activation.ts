/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * @fileoverview Starting things that may never finish.
 *
 * NOTHING HERE IMPORTS `vscode`, which is the only reason any of it is tested:
 * this extension's suite runs under bun with no workbench, so a test can reach
 * what lives here and cannot reach what lives in an `activate.ts`. The rules
 * about waiting are what went wrong on 2026-08-13, so they are what moved.
 */

/** What a bounded wait answers when the promise did not settle in time. */
export const NO_ANSWER = Symbol('no answer');

/**
 * The promise's own answer, or `NO_ANSWER` once `ms` have passed.
 *
 * A LATE ANSWER IS NOT AN ERROR AND IS NOT REPORTED. Nothing here can cancel the
 * work behind the promise — a promise the API never settles cannot be settled
 * from outside it — so this bounds the WAIT and nothing else. A rejection
 * arriving after the bound is swallowed rather than left unhandled, because the
 * race has already attached a handler to it.
 */
export async function answerWithin<T>(
	promise: PromiseLike<T>,
	ms: number
): Promise<T | typeof NO_ANSWER> {
	let timer: ReturnType<typeof setTimeout> | undefined;
	const expiry = new Promise<typeof NO_ANSWER>((resolve) => {
		timer = setTimeout(() => resolve(NO_ANSWER), ms);
	});
	try {
		return await Promise.race([promise, expiry]);
	} finally {
		if (timer !== undefined) { clearTimeout(timer); }
	}
}

/** One thing that can be started and might not come back. */
export type Startable = {
	readonly name: string;
	readonly start: () => Promise<unknown>;
};

export type Outcome = {
	readonly name: string;
	/**
	 * `still running` is not a failure and not a success. It is the honest third
	 * answer: the thing was started, it has not come back, and nothing is waiting
	 * for it any more.
	 */
	readonly state: 'activated' | 'failed' | 'still running';
	readonly error?: string;
	/**
	 * How long it took, which used to be said in the log line and nowhere a caller
	 * could reach. It is the arithmetic that found the 2026-08-13 fault — agent-tree
	 * at 5295ms against 220-372ms for the panels that do not sweep — so it belongs
	 * in the answer rather than only in the prose about the answer.
	 *
	 * For `still running` this is the bound rather than a duration: the work has not
	 * come back, so nothing knows how long it will take.
	 */
	readonly ms: number;
};

/**
 * Starts everything at once, isolated, and answers for each one.
 *
 * THE ISOLATION IS THE POINT, and there are three separate leaks it closes.
 * A THROW cannot reach a sibling, because each start gets its own handlers
 * attached the moment it is made. A HANG cannot reach a sibling, because each
 * wait is bounded and passing the bound stops the waiting rather than the work.
 * And ORDER cannot matter, because they start together rather than in a chain.
 *
 * This replaces six `await`s in a row in `extension.ts`. That chain gave the
 * first thing to stall the power to decide whether anything after it ran at all,
 * and on 2026-08-13 the first thing stalled: Alan lost all three panels, the
 * status bar and the transcript command to one terminal that never reported its
 * process. Fixing that one terminal would have handed the same power to whatever
 * stalls next, so the shape is what changed.
 *
 * The returned promise always resolves, and resolves within `timeoutMs` of the
 * slowest start being made.
 */
export async function startIsolated(
	startables: readonly Startable[],
	timeoutMs: number,
	log: (line: string) => void
): Promise<readonly Outcome[]> {
	return Promise.all(
		startables.map(async (startable): Promise<Outcome> => {
			const began = Date.now();
			let state: Outcome['state'] = 'still running';
			let error: string | undefined;
			let ms: number | undefined;

			// Handlers attached here rather than at the race, so a rejection is
			// answered for whether or not anyone is still waiting when it lands.
			const running = startable.start().then(
				() => {
					state = 'activated';
					ms = Date.now() - began;
					log(`[${startable.name}] activated in ${ms}ms`);
				},
				(err: unknown) => {
					state = 'failed';
					ms = Date.now() - began;
					error = err instanceof Error ? err.message : String(err);
					log(`[${startable.name}] FAILED after ${ms}ms: ${error}`);
				}
			);

			await answerWithin(running, timeoutMs);

			if (state === 'still running') {
				log(
					`[${startable.name}] has not finished after ${timeoutMs}ms — no longer ` +
					`waiting for it. Everything else is unaffected.`
				);
			}
			return { name: startable.name, state, error, ms: ms ?? timeoutMs };
		})
	);
}
