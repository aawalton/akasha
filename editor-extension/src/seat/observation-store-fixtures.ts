import type { Fetcher } from './observation-store.ts';
import { createObservationStore, type ObservationStore } from './observation-store.ts';
import type { Observation } from './observations.ts';

export interface Sent {
	readonly url: string;
	readonly writer: string;
	readonly features: Record<string, Observation>;
	readonly observedAt: string;
}

export const ORIGIN = 'http://pages.test';
export const WINDOW = '4242.46800522';

export function service(): {
	readonly sent: readonly Sent[];
	readonly fetcher: Fetcher;
	readonly refuse: (status: number) => void;
	readonly goSilent: () => void;
	readonly accept: () => void;
} {
	const sent: Sent[] = [];
	let answer = (): Response => new Response('{"ok":true}', { status: 200 });
	return {
		sent,
		fetcher: async (url, init) => {
			const body = JSON.parse(String(init.body)) as {
				writer: string;
				values: { features: Record<string, Observation>; 'observed-at': string };
			};
			sent.push({
				url,
				writer: body.writer,
				features: body.values.features,
				observedAt: body.values['observed-at'],
			});
			return answer();
		},
		refuse: (status) => {
			answer = (): Response => new Response('the gates refused it', { status });
		},
		goSilent: () => {
			answer = (): Response => {
				throw new Error('nothing answered');
			};
		},
		accept: () => {
			answer = (): Response => new Response('{"ok":true}', { status: 200 });
		},
	};
}

export function makeStore(
	options: {
		readonly settleMs?: number;
		readonly window?: string;
		readonly service?: ReturnType<typeof service>;
		readonly onError?: (message: string) => void;
	} = {}
): { store: ObservationStore; sent: readonly Sent[] } {
	const pages = options.service ?? service();
	let tick = 0;
	const store = createObservationStore({
		window: options.window ?? WINDOW,
		origin: ORIGIN,
		fetch: pages.fetcher,
		settleMs: options.settleMs ?? 0,
		now: () => {
			tick += 1;
			return new Date(Date.UTC(2026, 7, 13, 20, 0, tick));
		},
		...(options.onError === undefined ? {} : { onError: options.onError }),
	});
	return { store, sent: pages.sent };
}
