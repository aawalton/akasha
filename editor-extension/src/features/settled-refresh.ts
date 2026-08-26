/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * A read that answers to events rather than to a clock, and never stacks.
 *
 * WHY THE PANELS NEED THIS TO BE WATCHED AT ALL. The Domains and Work views each re-read by
 * spawning an `ops` command that parses a whole repository. Both were built with no poll, and the
 * reason each states is sound: a timer against a corpus that changes when somebody commits is a
 * subprocess a minute, for ever, against a view whose content changed hours ago. What that
 * reasoning left standing was a panel that changed only when Alan pressed a button — so a corpus
 * that HAD changed looked exactly like one that had not. A watcher costs nothing while nothing is
 * written and reads exactly when something is, which is the trigger a timer was standing in for.
 *
 * WHY THE WATCHER CANNOT BE WIRED STRAIGHT TO THE READ. A commit lands its documents one write at a
 * time, so a watcher wired directly would spawn one whole-corpus read per file — forty files in a
 * commit, forty readers of the same corpus, and the fortieth answering what the first would have.
 * This waits for the writing to stop and then reads once.
 *
 * IT ALSO NEVER RUNS TWO AT ONCE. A read takes about a second and Alan's refresh button reaches the
 * same function, so a click landing mid-read would overlap two of them against one view. A request
 * arriving while a read is running is remembered rather than started, and the read that finishes
 * then runs it. That is the correct answer as well as the cheap one: the change that raised the
 * request landed after the running read had already begun, so that read cannot be showing it.
 *
 * NOTHING HERE IMPORTS `vscode`, so it can be held against a test runner that has no workbench —
 * the reason the `ids` modules beside it are kept separate too.
 */

/** What a caller can do to a settled read once it has one. */
export interface SettledRefresh {
	/**
	 * Asks for a read, once the corpus has been quiet for the settling time.
	 *
	 * Answers immediately and always. A request is a statement that something changed, not a call
	 * to wait for what it changed into.
	 */
	readonly request: (trigger: string) => undefined;
	readonly dispose: () => undefined;
}

/**
 * Wraps a read so that bursts of requests become one, and two never run together.
 *
 * `run` answers for its own failures. Both panels already catch inside their refresh and write the
 * reason to their output channel, which is what keeps a failed read from taking the settling loop
 * down with it — but the guard below does not depend on that being true.
 */
export function createSettledRefresh(
	quietMs: number,
	run: (trigger: string) => Promise<undefined>
): SettledRefresh {
	let timer: ReturnType<typeof setTimeout> | undefined;
	let running = false;
	/** The trigger of a request that arrived mid-read, to be run once this one is done. */
	let queued: string | undefined;

	const drain = async (first: string): Promise<undefined> => {
		running = true;
		try {
			// A LOOP RATHER THAN A SECOND CALL, so a corpus being written throughout a long read
			// leaves one follow-up read rather than a stack of them growing as deep as the writing
			// went on.
			let trigger: string | undefined = first;
			while (trigger !== undefined) {
				try {
					await run(trigger);
				} catch {
					// SWALLOWED, AND THIS IS THE ONLY PLACE IT COULD BE ANYTHING ELSE. Nothing is
					// awaiting this loop — it is started by a file watcher, which has no caller to
					// answer to — so a throw escaping here is an unhandled rejection in the
					// extension host and a settling loop that never runs again. Both panels already
					// catch inside their own refresh and put the reason on screen and in their
					// output channel, which is where a failed read belongs; this exists so that a
					// read which somehow got past that costs one reading rather than every later
					// one.
				}
				trigger = queued;
				queued = undefined;
			}
		} finally {
			running = false;
		}
		return undefined;
	};

	return {
		request: (trigger: string) => {
			// RESTARTED RATHER THAN LEFT TO FINISH, which is what makes the wait a settling time
			// rather than a rate limit: the read happens once the writing has stopped, however long
			// the writing went on.
			if (timer !== undefined) { clearTimeout(timer); }
			timer = setTimeout(() => {
				timer = undefined;
				if (running) {
					queued = trigger;
					return;
				}
				void drain(trigger);
			}, quietMs);
			return undefined;
		},
		dispose: () => {
			if (timer !== undefined) { clearTimeout(timer); }
			timer = undefined;
			// A READ ALREADY RUNNING IS LEFT TO FINISH. It holds a subprocess and a view handle, and
			// abandoning it would leave the panel showing a message about a read nothing will ever
			// complete. What this drops is the follow-up, which is what disposal is for.
			queued = undefined;
			return undefined;
		},
	};
}
