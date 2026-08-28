import { PAGE_QUERY_ORIGIN } from '../../../readouts/ask-over-http.ts';
import { deferCommits } from '../../../tools/lib/page-commit-queue.ts';
import { written } from '../../../tools/lib/page-query-landing.ts';
import { rootsHere } from '../../../repo/roots/roots.ts';
import { changeKey, type Observation } from "./observations.ts"
import { foldSweep, mergeObservation, type ObservationPatch } from "./observation-merge.ts";

export interface SweepReport {
	readonly swept: number;
	readonly read: number;
	readonly noProcess: number;
	readonly neverAnswered: number;
	readonly boundMs: number;
	readonly ms: number;
	readonly trigger: string;
}

export const SETTLE_MS = 250;

const WINDOW_PAGE_TYPE = 'code-editor-window';

const WRITER = 'editor-observations';

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>;

const SAYS = '[editor-observations]';

function writerFor(window: string): Fetcher {
	return async (url, init) => {
		deferCommits();
		const said = await written(rootsHere(), 'patch-state', WINDOW_PAGE_TYPE, window, new Request(url, init), SAYS);
		return new Response(JSON.stringify(said.body), { status: said.status });
	};
}

export interface ObservationStore {
	readonly record: (feature: string, patch: ObservationPatch) => void;
	readonly recordSweep: (feature: string, report: SweepReport) => void;
	readonly current: (feature: string) => Observation | undefined;
	readonly flush: () => Promise<void>;
	readonly dispose: () => Promise<void>;
	readonly url: string;
}

export interface StoreOptions {
	readonly window: string;
	readonly origin?: string;
	readonly fetch?: Fetcher;
	readonly now?: () => Date;
	readonly settleMs?: number;
	readonly onError?: (message: string) => void;
}

export function createObservationStore(options: StoreOptions): ObservationStore {
	const now = options.now ?? ((): Date => new Date());
	const settleMs = options.settleMs ?? SETTLE_MS;
	const ask: Fetcher = options.fetch ?? writerFor(options.window);
	const url =
		`${options.origin ?? PAGE_QUERY_ORIGIN}/patch-state/${WINDOW_PAGE_TYPE}/${options.window}`;

	let features: Record<string, Observation> = {};
	let writtenKey = changeKey({});
	let timer: ReturnType<typeof setTimeout> | undefined;
	let writing: Promise<void> = Promise.resolve();

	const write = async (): Promise<void> => {
		const key = changeKey(features);
		if (key === writtenKey) { return; }
		const values = { features, 'observed-at': now().toISOString() };
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
			const merged = mergeObservation(features[feature], patch, now().toISOString());
			const candidate = { ...features, [feature]: merged };
			if (changeKey(candidate) === changeKey(features)) { return; }
			features = candidate;
			if (changeKey(features) === writtenKey) { return; }
			schedule();
		},

		flush: async () => {
			if (timer !== undefined) { clearTimeout(timer); timer = undefined; }
			writing = writing.then(write);
			await writing;
		},

		dispose: async () => {
			if (timer !== undefined) { clearTimeout(timer); timer = undefined; }
			await writing.catch(() => undefined);
		},
	};
	return self;
}

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
