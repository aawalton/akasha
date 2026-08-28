/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview Writing the observation record onto the window's page, and not writing it.
 *
 * The shaping, the change detection and the reads are in `./observations.ts`,
 * which imports nothing at all and is exercised without a workbench. What is here
 * is the holding, the coalescing and the write itself.
 *
 * NOTHING HERE IMPORTS `vscode` EITHER. The window's page name, the service
 * origin, the fetch and the clock all arrive as arguments, so this file's
 * behaviour — including the part that matters most, that an unchanged observation
 * writes nothing — is reachable from the bun suite with no network and no
 * workbench.
 *
 * THE RECORD IS THE WINDOW'S PAGE rather than a file of this store's own. It was
 * JSON under `~/.cache`, which bought a directory only this code knew about, a
 * reaper for the windows that were killed rather than closed, and a reader who had
 * to be told where to look. `code-editor-window` already carries a page for every
 * window — the same one `features/editor-layout/activate.ts` projects the
 * arrangement onto — so what each feature observed is a property of it.
 */
import { PAGE_QUERY_ORIGIN } from '../../../readouts/ask-over-http.ts';
import { deferCommits } from '../../../tools/lib/page-commit-queue.ts';
import { written } from '../../../tools/lib/page-query-landing.ts';
import { rootsHere } from '../../../repo/roots/roots.ts';
import { changeKey, type Observation } from "./observations.ts"
import { foldSweep, mergeObservation, type ObservationPatch } from "./observation-merge.ts";

/**
 * What a caller knows about a sweep it just ran, before the window's history is
 * folded in.
 *
 * Structural rather than `PidTally` so this file stays free of what a sweep is;
 * the fields are the tally's, and `terminal-pids.ts` is where they are named.
 */
export interface SweepReport {
	readonly swept: number;
	readonly read: number;
	readonly noProcess: number;
	readonly neverAnswered: number;
	readonly boundMs: number;
	readonly ms: number;
	readonly trigger: string;
}

/**
 * How long a burst of reports is allowed to settle before the record is written.
 *
 * Seven features activate at once and several report as they do, so activation is
 * one burst rather than seven writes. Matches the layout record's settle for the
 * same reason.
 */
export const SETTLE_MS = 250;

/** The page type a window's page stands under, one page per window. */
const WINDOW_PAGE_TYPE = 'code-editor-window';

/** Who the service records as having written this, beside every other writer. */
const WRITER = 'editor-observations';

/**
 * What performs the write.
 *
 * THE SHAPE IS `fetch`'s AND THE DEFAULT IS NOT. Every test drives this store by injecting one
 * of these, so the seam is kept exactly as it was; what changed is where an uninjected one goes.
 * It reached the page query service over HTTP and now calls the same `patch-state` route
 * function in this process — see `writerFor`.
 */
export type Fetcher = (url: string, init: RequestInit) => Promise<Response>;

/** Who the record is written as, in the line a slow write logs. */
const SAYS = '[editor-observations]';

/**
 * The default writer: the service's own `patch-state` route, called here rather than posted to.
 *
 * STILL THE SAME ROUTE. `written` is what the service's write route calls, so the record takes
 * the same judgement and lands in the same place; there is simply no socket in front of it.
 *
 * NO CEILING ANY MORE. The 10s one this had bounded a request that could queue behind every
 * other caller of a single-threaded service. A call in this process cannot queue behind anything
 * but itself, and `patch-state` writes the page's uncommitted sidecar rather than committing.
 */
function writerFor(window: string): Fetcher {
	return async (url, init) => {
		deferCommits();
		const said = await written(rootsHere(), 'patch-state', WINDOW_PAGE_TYPE, window, new Request(url, init), SAYS);
		return new Response(JSON.stringify(said.body), { status: said.status });
	};
}

export interface ObservationStore {
	/** Merge what a feature observed, and write only if that changed anything. */
	readonly record: (feature: string, patch: ObservationPatch) => void;
	/**
	 * Record a sweep, folded against what this feature has already seen.
	 *
	 * Here rather than at each call site because the fold has to read the previous
	 * value, and three sites in three features would otherwise each reach for it and
	 * each be a place to get the high-water mark wrong.
	 */
	readonly recordSweep: (feature: string, report: SweepReport) => void;
	/** What this feature last reported, so a caller can fold against it. */
	readonly current: (feature: string) => Observation | undefined;
	/** Write now rather than at the end of the settle, for a test or a command. */
	readonly flush: () => Promise<void>;
	/** Stop reporting: cancel the settle and let a write in flight finish. */
	readonly dispose: () => Promise<void>;
	/** Where this store writes. */
	readonly url: string;
}

export interface StoreOptions {
	/**
	 * Which window this is, as its page is named: `<pid>.<start>`, which is what
	 * `readProcess` in `./window-identity.ts` answers.
	 *
	 * THE SAME NAME `features/editor-layout/activate.ts` ALREADY PROJECTS UNDER, so
	 * what the features observed and how the window is arranged are two properties
	 * of one page rather than two records of one window.
	 *
	 * NOT A SESSION ID. This took `vscode.env.sessionId` and that value is the
	 * constant `someValue.sessionId` in every served instance of this fork, so two
	 * live windows shared one record and it described neither. See
	 * `./window-identity.ts`.
	 */
	readonly window: string;
	/** Where the page query service is, so a test can name one of its own. */
	readonly origin?: string;
	/** Injected so the unit suite can drive the route with no network behind it. */
	readonly fetch?: Fetcher;
	readonly now?: () => Date;
	readonly settleMs?: number;
	/** Told what went wrong, since a store has no channel of its own. */
	readonly onError?: (message: string) => void;
}

/**
 * A store for one window.
 *
 * A FACTORY THE CALLER OWNS rather than module state that activation sets up,
 * which is the shape `features/agent-tree/columns.ts` already uses for its
 * memento. It is also what lets a test hold two independent stores.
 */
export function createObservationStore(options: StoreOptions): ObservationStore {
	const now = options.now ?? ((): Date => new Date());
	const settleMs = options.settleMs ?? SETTLE_MS;
	const ask: Fetcher = options.fetch ?? writerFor(options.window);
	const url =
		`${options.origin ?? PAGE_QUERY_ORIGIN}/patch-state/${WINDOW_PAGE_TYPE}/${options.window}`;

	let features: Record<string, Observation> = {};
	// What the page holds. Compared against, never written from — see `record`.
	let writtenKey = changeKey({});
	let timer: ReturnType<typeof setTimeout> | undefined;
	let writing: Promise<void> = Promise.resolve();

	const write = async (): Promise<void> => {
		// THE ONE PLACE THE RULE IS ENFORCED, and it is here rather than only at the
		// call sites because this is the single point a write happens. The guards
		// before this one keep a timer from being armed at all, which is cheaper; this
		// is what makes the rule true. Put only at the call sites, removing one of them
		// left every test still passing — they reached the service through `flush`,
		// whose own guard was doing the work, while the timer path that production
		// actually uses had lost it. A check that cannot fail is not a check.
		const key = changeKey(features);
		if (key === writtenKey) { return; }
		// SENT WITH ITS SHAPE INTACT. `patch-state` is exempt from the flat-value check
		// every other write takes — `tools/lib/page-query-landing.ts` — and `features`
		// is a `json` property, so the map goes as it stands. Flattened or stringified
		// it would need a reader to put it back, and every putting back is a place for
		// the record to come out saying something the window never said.
		const values = { features, 'observed-at': now().toISOString() };
		// THE KEY IS NOT ADVANCED ON A FAILED WRITE, which is what both returns below
		// are for. Advancing it would mean the next identical observation is judged
		// already written and skipped, and the page would stay wrong until something
		// else happened to change — which is the failure that hides itself.
		try {
			const response = await ask(url, {
				method: 'POST',
				headers: { 'content-type': 'application/json', accept: 'application/json' },
				body: JSON.stringify({ writer: WRITER, values }),
			});
			if (!response.ok) {
				const said = (await response.text().catch(() => '')).trim();
				options.onError?.(`observation write refused: ${response.status} ${said}`);
				return;
			}
		} catch (err) {
			options.onError?.(`observation write failed: ${String(err)}`);
			return;
		}
		// The key AS SENT rather than as it stands now: an observation that arrived
		// while the request was in flight has not reached the page, and marking it
		// written would be how it never does.
		writtenKey = key;
	};

	const schedule = (): void => {
		if (timer !== undefined) { clearTimeout(timer); }
		timer = setTimeout(() => {
			timer = undefined;
			writing = writing.then(write);
		}, settleMs);
	};

	const self: ObservationStore = {
		url,

		current: (feature) => features[feature],

		recordSweep: (feature, report) => {
			self.record(feature, {
				sweep: foldSweep(features[feature]?.sweep, {
					...report,
					at: now().toISOString(),
				}),
			});
		},

		record: (feature, patch) => {
			// Merged against a candidate rather than in place, because a patch that
			// changes nothing must leave `at` where it was: stamping it first and
			// comparing after would make every report a change and defeat the whole
			// point of comparing.
			const merged = mergeObservation(features[feature], patch, now().toISOString());
			const candidate = { ...features, [feature]: merged };
			if (changeKey(candidate) === changeKey(features)) { return; }
			features = candidate;
			// Compared against what the PAGE holds rather than against what was last
			// reported, so a change and a change back — a sweep that fails and recovers
			// inside one settle — costs nothing rather than two writes.
			if (changeKey(features) === writtenKey) { return; }
			schedule();
		},

		flush: async () => {
			if (timer !== undefined) { clearTimeout(timer); timer = undefined; }
			// No guard of its own: `write` refuses an unchanged record itself. A second
			// copy here is what let the rule be deleted from `record` with every test
			// still green, because the tests reach the service through this door and
			// production reaches it through the timer.
			writing = writing.then(write);
			await writing;
		},

		dispose: async () => {
			if (timer !== undefined) { clearTimeout(timer); timer = undefined; }
			// NOTHING IS TAKEN AWAY HERE, and that is the change rather than an omission.
			// The record was a file of this store's own, and closing removed it so that a
			// reader meeting one was usually meeting a live window. It is the window's
			// page now, and `pages/page-type/code-editor-window.md` states that a closed
			// window's page is taken by the hourly sweep rather than as it closes —
			// `services/sweep-editor-pages.ts` is what takes it. So all this owes is to
			// stop the settle and let a write already in flight finish.
			await writing.catch(() => undefined);
		},
	};
	return self;
}

/**
 * The one store this extension host is writing to, and the reports into it.
 *
 * A MODULE-LEVEL HANDLE, WHICH THE FACTORY ABOVE DELIBERATELY IS NOT. Six
 * features report from a dozen call sites, and threading a handle through every
 * signature between `activate` and the line that counted something would be a
 * wide change to a lot of files for one narrow purpose. This is the same shape
 * every feature already uses for its output channel.
 *
 * REPORTING BEFORE ANYTHING IS SET UP IS A NO-OP RATHER THAN A THROW. The suite
 * runs these modules with no store, and a feature must not be able to fail
 * because the recorder did not exist yet — an observation is worth strictly less
 * than the thing being observed.
 */
let store: ObservationStore | undefined;

export function setObservationStore(next: ObservationStore | undefined): void {
	store = next;
}

export function recordObservation(feature: string, patch: ObservationPatch): void {
	store?.record(feature, patch);
}

export function recordSweep(feature: string, report: SweepReport): void {
	store?.recordSweep(feature, report);
}

export function currentObservation(feature: string): Observation | undefined {
	return store?.current(feature);
}
