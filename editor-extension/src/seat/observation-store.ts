import { akashaRoot, harnessEnvironment } from '../harness-call.ts';
import { changeKey, type Observation } from "./observations.ts"
import { foldSweep, mergeObservation, type ObservationPatch } from "./observation-merge.ts";
import { bunIn, writerMainIn, writingTo, type Writing } from './observation-writer.ts';

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

// THIS NAMES NO SERVER AND NEVER DID. The store was written against a `fetch`, and the URL it
// builds is how a write says which page it is for; nothing has ever listened on this port. Read as
// an HTTP POST it looks like work that leaves the process, which is exactly what it was not: the
// write landed in-process and synchronously, on the extension host's one thread.
const REPRESENTS_AN_ORIGIN = 'http://127.0.0.1:8787';

interface Writer {
	readonly ask: Fetcher;
	readonly dispose: () => Promise<void>;
}

// OFF THE HOST'S THREAD, NOT LESS OFTEN. `written(… 'patch-state' …)` has to be told where the
// window's page is, and `whereFor` answers that by walking every markdown file in the
// checkout. Measured on this box at load 17, one write held the calling thread 202-430ms, median
// 307ms, and six in a row read as one unbroken 1521ms block. The pollers ask about once a second,
// so the host's event loop was spending about a third of itself inside this call, and a blocked
// host repaints nothing — which is why the panels and the status line froze together rather than
// any one of them being slow.
//
// A floor under how often a write may start was tried before this and reverted: blocked medians
// 11438ms against 20486ms, no improvement, the within-condition variance swamping the effect. The
// cost is per write and the writes are not redundant, so writing less often only makes the
// observations staler for the same stalls.
//
// What is here instead hands the same call, unchanged, to a bun child that does nothing else.
//
// The `deferCommits()` that was here is gone rather than moved. `patchState` lands
// `<page>.uncommitted.yaml` and never reaches `landOne`, so this act queued no commit and had
// nothing to defer; what the call did do was register exit handlers and run `recoverLandings()`,
// which adopts landing journals from dead writers and commits them with `git`, on the thread that
// draws the editor. The host still defers from `editor-layout`, so nothing stops being recovered.
function writerFor(window: string, onError?: (message: string) => void): Writer {
	let client: Writing | undefined;
	const held = (): Writing => {
		if (client === undefined) {
			client = writingTo({
				bun: bunIn(),
				mainFile: writerMainIn(akashaRoot()),
				env: harnessEnvironment(),
				onNoise: (text) => onError?.(`${SAYS} ${text}`),
			});
		}
		return client;
	};
	return {
		ask: async (url, init) => {
			const said = await held().ask({
				act: 'patch-state',
				pageType: WINDOW_PAGE_TYPE,
				name: window,
				url,
				method: typeof init.method === 'string' ? init.method : 'POST',
				headers: (init.headers ?? {}) as Record<string, string>,
				body: typeof init.body === 'string' ? init.body : '',
			});
			const body = said.ok ? said.body : { error: said.saying ?? 'the observation writer refused' };
			return new Response(JSON.stringify(body), { status: said.status });
		},
		dispose: async () => { await client?.dispose(); },
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
	// A caller naming its own `fetch` starts no child and disposes of none — which is how every
	// test of this store runs, and why none of them spawn bun.
	const writer: Writer =
		options.fetch === undefined
			? writerFor(options.window, options.onError)
			: { ask: options.fetch, dispose: async () => undefined };
	const ask = writer.ask;
	const url =
		`${options.origin ?? REPRESENTS_AN_ORIGIN}/patch-state/${WINDOW_PAGE_TYPE}/${options.window}`;

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

		// THE LAST STATE LANDS BEFORE THE CHILD IS LET GO. This cleared the settle timer and awaited
		// only what was already in flight, so everything recorded inside the last 250ms — which on a
		// window closing is the shutdown itself, the most interesting observation there is — was
		// thrown away by the dispose that was supposed to preserve it. The write is asked for first
		// now, and only then is the writer disposed, which closes the child's stdin and waits for it
		// to drain what it holds.
		dispose: async () => {
			if (timer !== undefined) { clearTimeout(timer); timer = undefined; }
			writing = writing.then(write);
			await writing.catch(() => undefined);
			await writer.dispose().catch(() => undefined);
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
