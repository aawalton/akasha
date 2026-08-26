/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * @fileoverview The one place `Terminal.processId` is awaited.
 *
 * THE API'S PROMISE HAS NO BOTTOM. `ExtHostTerminal` builds `_pidPromise` in its
 * constructor, and exactly two things settle it: `_setProcessId`, by way of
 * `$acceptTerminalProcessId`, and `_setNoProcess`, which has ONE call site — the
 * terminal-closed path.
 *
 * `_onTerminalProcessIdReady` sends the pid UNCONDITIONALLY. Three lines, no
 * guard, whatever `instance.processId` holds. What decides the outcome is not
 * what it sends but whether it is reached at all, and it is reached only once the
 * instance's pty becomes ready. So a terminal that is live, undisposed, and whose
 * pty never becomes ready reaches neither settling path, and its promise stays
 * pending for the life of the extension host: no rejection, no timeout, nothing
 * in that chain that ever gives up.
 *
 * THIS PARAGRAPH USED TO SAY that the send returns without doing anything when
 * `instance.processId` is undefined. It does not, and does not in this fork —
 * that guard was dead code and was removed, which the workbench file says of
 * itself. The account was written from reading rather than from driving, stood
 * for two projects, and was taken as established by everyone who came to it. Read
 * the source before trusting a mechanism described in prose, this passage
 * included.
 *
 * Not hypothetical, though the link is NOT established. On 2026-08-13 Alan
 * reloaded his window, the pty host could not find the ptys for seven of his
 * terminals, and every panel that reads a terminal was stuck for the session.
 * Later measurement put the count of silent terminals at ONE rather than seven,
 * so those are two readings and not yet one cause.
 *
 * WHY THIS IS A MODULE OF ITS OWN rather than a bound written at each call site.
 * Three call sites reached this API and two of them were written without a
 * bound; the site written next month would have been the third. So the await
 * moved somewhere a test can hold it to one place —
 * `terminal-pids.unit.test.ts` fails when `.processId` appears anywhere else in
 * `src/`, and that test runs on every commit that touches this extension.
 *
 * NOTHING HERE IMPORTS `vscode`, and the structural `HasProcessId` below is why.
 * This extension's suite runs under bun with no workbench, so a test can reach
 * what lives here and cannot reach what lives in an `activate.ts`. Typing the
 * argument by its shape rather than as `vscode.Terminal` is what puts the
 * bounded sweep on the tested side of that line.
 */

/**
 * How long the sweep is given before it stops waiting.
 *
 * Generous against what is being waited for rather than a guess at how slow a
 * healthy terminal can be: the pid is sent as soon as the process is ready, so
 * only a terminal that is never going to answer reaches this.
 */
export const PROCESS_ID_TIMEOUT_MS = 5_000;

/**
 * What this needs of a terminal, and nothing else.
 *
 * `vscode.Terminal.processId` is `Thenable<number | undefined>`, which is this.
 */
export interface HasProcessId {
	readonly processId: PromiseLike<number | undefined>;
}

/** Internal marker for a terminal that did not answer inside the bound. */
const NEVER_ANSWERED = Symbol('never answered');

/**
 * What one terminal said, keeping apart the two ways of saying nothing.
 *
 * `no process` is a fact about the terminal — it answered, and its answer was
 * that it has no process. `never answered` is a fact about the wait. Both mean
 * the terminal is passed over, and callers that log say which happened.
 */
export type PidReading<T> =
	| { readonly terminal: T; readonly pid: number; readonly outcome: 'read' }
	| { readonly terminal: T; readonly pid: undefined; readonly outcome: 'no process' }
	| { readonly terminal: T; readonly pid: undefined; readonly outcome: 'never answered' };

/**
 * Every terminal's process id, read against ONE deadline for the whole sweep.
 *
 * THE SHARED DEADLINE IS THE POINT. Bounding each terminal separately and
 * awaiting them in turn makes a window with eight dead terminals pay the bound
 * eight times — at five seconds each, forty seconds of a panel that still looks
 * stuck, which is the fault rather than a fix for it. Every terminal here races
 * the same expiry, so this returns within `ms` of being called however many
 * terminals the window holds.
 *
 * Awaiting them together costs nothing, because `processId` is a promise the
 * workbench built in its own constructor: it is already in flight before anyone
 * awaits it, so awaiting starts no work and sequencing the awaits only
 * serialises waiting that was already happening in parallel.
 *
 * A REJECTION IS AN ANSWER OF `never answered` rather than a throw, so one bad
 * terminal cannot take the sweep down with it. Handlers are attached to every
 * promise as it is raced, so a rejection landing after the bound is not left
 * unhandled.
 *
 * Nothing here can cancel the work behind the promise — a promise the API never
 * settles cannot be settled from outside it — so this bounds the WAIT and
 * nothing else. A late answer is dropped rather than reported.
 *
 * The result is aligned with `terminals`, one reading each, in order.
 */
export async function readProcessIds<T extends HasProcessId>(
	terminals: readonly T[],
	ms: number = PROCESS_ID_TIMEOUT_MS
): Promise<readonly PidReading<T>[]> {
	// No terminals is no deadline: an empty window must not arm a timer and then
	// sit on it for the length of the bound.
	if (terminals.length === 0) { return []; }

	let timer: ReturnType<typeof setTimeout> | undefined;
	const expiry = new Promise<typeof NEVER_ANSWERED>((resolve) => {
		timer = setTimeout(() => resolve(NEVER_ANSWERED), ms);
	});

	try {
		return await Promise.all(
			terminals.map(async (terminal): Promise<PidReading<T>> => {
				const answer = await Promise.race([
					Promise.resolve(terminal.processId).then(
						(pid) => pid,
						(): typeof NEVER_ANSWERED => NEVER_ANSWERED
					),
					expiry,
				]);
				if (answer === NEVER_ANSWERED) {
					return { terminal, pid: undefined, outcome: 'never answered' };
				}
				if (answer === undefined) {
					return { terminal, pid: undefined, outcome: 'no process' };
				}
				return { terminal, pid: answer, outcome: 'read' };
			})
		);
	} finally {
		if (timer !== undefined) { clearTimeout(timer); }
	}
}

/**
 * What one sweep found, counted by outcome.
 *
 * WHY THIS IS COUNTED AT ALL. `identified` drops `no process` and `never answered` into
 * the same silence, which is right for the caller and wrong for the log: a panel that
 * says "7 seat terminal(s) here" reads exactly the same whether the other terminals
 * answered and were not seats, or never answered and cost the whole bound. That gap is
 * what made the 2026-08-13 outage take a day to see, and it is why the outcomes are kept
 * apart in `PidReading` in the first place. Counting them is what puts the difference
 * somewhere a reader can find it.
 */
export interface PidTally {
	readonly swept: number;
	readonly read: number;
	readonly noProcess: number;
	readonly neverAnswered: number;
}

export function tally<T>(readings: readonly PidReading<T>[]): PidTally {
	let read = 0;
	let noProcess = 0;
	let neverAnswered = 0;
	for (const reading of readings) {
		if (reading.outcome === 'read') { read += 1; }
		else if (reading.outcome === 'no process') { noProcess += 1; }
		else { neverAnswered += 1; }
	}
	return { swept: readings.length, read, noProcess, neverAnswered };
}

/** The tally as one clause of a log line, saying nothing where there is nothing to say. */
export function tallyLine(counted: PidTally, ms: number): string {
	const parts = [`${counted.read} read`];
	if (counted.noProcess > 0) { parts.push(`${counted.noProcess} with no process`); }
	if (counted.neverAnswered > 0) { parts.push(`${counted.neverAnswered} NEVER ANSWERED`); }
	return `${counted.swept} terminal(s) swept in ${ms}ms: ${parts.join(', ')}`;
}

/**
 * What naming a terminal in a log line needs of it, and nothing else.
 *
 * SEPARATE FROM `HasProcessId` DELIBERATELY. That is what the sweep AWAITS;
 * this is what it can still READ once the await has given up. A terminal that
 * never answered has no pid to be identified by, so what the API says about it
 * without asking its process anything is the only handle left on it.
 */
export interface HasIdentity {
	readonly name: string;
	readonly creationOptions: {
		readonly shellPath?: string | undefined;
		readonly cwd?: string | { readonly path?: string } | undefined;
		readonly hideFromUser?: boolean | undefined;
		readonly location?: unknown;
	};
	readonly exitStatus?: { readonly code?: number | undefined } | undefined;
}

/** `vscode.TerminalLocation.Editor`, spelled out because nothing here imports `vscode`. */
const LOCATION_EDITOR = 2;

/** Where a terminal was asked to open, from whichever shape its options used. */
function describeLocation(location: unknown): string {
	if (location === undefined) { return 'unset'; }
	if (typeof location === 'number') { return location === LOCATION_EDITOR ? 'editor' : 'panel'; }
	if (typeof location === 'object' && location !== null) {
		const shape = location as { readonly viewColumn?: unknown; readonly parentTerminal?: unknown };
		if (shape.viewColumn !== undefined) { return 'editor'; }
		if (shape.parentTerminal !== undefined) { return 'split'; }
	}
	return 'other';
}

/** A cwd that may be a path or a `Uri`, as one string. */
function describeCwd(cwd: string | { readonly path?: string } | undefined): string {
	if (cwd === undefined) { return 'unset'; }
	return JSON.stringify(typeof cwd === 'string' ? cwd : cwd.path ?? '');
}

/**
 * One terminal named by everything about it that does NOT need its process.
 *
 * WHY THIS EXISTS AT ALL. The sweep's own log said `terminal "bash" did not
 * report a process`, and `"bash"` is the name every unnamed terminal carries —
 * so across two days nobody could say WHICH terminal was costing the window its
 * bound, only that one was. A line that cannot tell its subject apart from
 * seventeen others reports the fault without advancing it.
 *
 * EACH FIELD IS HERE TO SPLIT A CANDIDATE THAT IS STILL OPEN, rather than to be
 * thorough. `shellPath` and `cwd` are carried by a terminal revived from a saved
 * launch config and are absent from one Alan opened himself, which is the
 * revived-or-fresh split nobody has been able to make. `hideFromUser` marks a
 * terminal that was never put in front of him and so may never have been
 * revealed. `location` separates one this extension created into an editor group
 * from one living in the panel. `exitStatus` separates a terminal still running
 * from a dead one still listed, which read identically in every log so far.
 *
 * The index is included because it is the only stable handle on a terminal the
 * window holds twice under the same name.
 */
export function describeTerminal(terminal: HasIdentity, index: number, of: number): string {
	const options = terminal.creationOptions;
	return [
		`#${index + 1}/${of}`,
		`name=${JSON.stringify(terminal.name)}`,
		`shellPath=${options.shellPath === undefined ? 'unset' : JSON.stringify(options.shellPath)}`,
		`cwd=${describeCwd(options.cwd)}`,
		`hideFromUser=${options.hideFromUser === true}`,
		`location=${describeLocation(options.location)}`,
		terminal.exitStatus === undefined
			? 'running'
			: `exited(code=${terminal.exitStatus.code ?? 'none'})`,
	].join(' ');
}

/**
 * Only the terminals that said what they are running.
 *
 * A TERMINAL THAT COULD NOT SAY IS PASSED OVER, never guessed at. `551a63a` set
 * that precedent next door in the rename feature: it leaves such a terminal
 * alone rather than renaming it off a pid nobody read, because putting a seat's
 * name on a tab that is not running it is worse than leaving the tab as it is.
 * The same holds for placing a transcript — the wrong group is worse than the
 * default one. Dropping them here rather than in each caller is what makes the
 * wrong guess unavailable rather than merely discouraged.
 */
export function identified<T>(
	readings: readonly PidReading<T>[]
): readonly { readonly terminal: T; readonly pid: number }[] {
	const found: { terminal: T; pid: number }[] = [];
	for (const reading of readings) {
		if (reading.outcome === 'read') { found.push({ terminal: reading.terminal, pid: reading.pid }); }
	}
	return found;
}
