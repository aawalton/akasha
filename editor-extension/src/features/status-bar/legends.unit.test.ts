import { describe, expect, test } from 'bun:test';
import { createLegendStore, type LegendRead, NO_LEGENDS } from './legends.ts';
import { STOPLIGHTS_SECTIONS, type StoplightsSection } from './slot-types.ts';

const LEGEND: Readonly<Record<StoplightsSection, string>> = {
	upkeep: 'Plants · Activity · Sleep · Surplus · Capacity · Safety',
	inbox: 'email · tasks · temper-tasks · unread-texts · questions',
	daily: 'Faith · Love · Health · Learn · Fun · Wealth',
};

const CEILING = 50;

const TTL = 20;

const REORDERED_UPKEEP = 'Safety · Surplus · Capacity · Plants · Activity · Sleep';

const never: LegendRead = () => new Promise<string>(() => undefined);

function collectFailures(): {
	readonly seen: StoplightsSection[];
	readonly onFailure: (section: StoplightsSection, reason: unknown) => undefined;
} {
	const seen: StoplightsSection[] = [];
	return {
		seen,
		onFailure: (section) => {
			seen.push(section);
			return undefined;
		},
	};
}

const settle = async (): Promise<undefined> => {
	await Promise.resolve();
	await Promise.resolve();
	return undefined;
};

describe('createLegendStore — the bar is readable before any legend arrives', () => {
	test('reads nothing at all before the first pump', () => {
		const { onFailure } = collectFailures();
		const store = createLegendStore(async (s) => LEGEND[s], onFailure, CEILING);
		expect(store.read()).toEqual(NO_LEGENDS);
	});

	test('pump returns without waiting for the read it started', () => {
		const { onFailure } = collectFailures();
		const store = createLegendStore(never, onFailure, CEILING);
		store.pump();
		expect(store.read()).toEqual(NO_LEGENDS);
	});

	test('every section gets its own legend once the reads land', async () => {
		const { onFailure } = collectFailures();
		const store = createLegendStore(async (s) => LEGEND[s], onFailure, CEILING);
		store.pump();
		await settle();
		expect(store.read()).toEqual(LEGEND);
	});
});

describe('createLegendStore — a failing legend costs its own group and no other', () => {
	test('a rejecting section leaves the other two legends standing', async () => {
		const { seen, onFailure } = collectFailures();
		const store = createLegendStore(
			async (s) => {
				if (s === 'upkeep') { throw new Error('the group would draw as an empty strip'); }
				return LEGEND[s];
			},
			onFailure,
			CEILING
		);
		store.pump();
		await settle();
		expect(store.read().upkeep).toBeUndefined();
		expect(store.read().inbox).toBe(LEGEND.inbox);
		expect(store.read().daily).toBe(LEGEND.daily);
		expect(seen).toEqual(['upkeep']);
	});

	test('a rejection is reported and never thrown at the caller', () => {
		const { seen, onFailure } = collectFailures();
		const store = createLegendStore(async () => {
			throw new Error('no such group');
		}, onFailure, CEILING);
		expect(() => store.pump()).not.toThrow();
		expect(seen).toEqual([]);
	});

	test('every section failing still leaves a store that answers', async () => {
		const { seen, onFailure } = collectFailures();
		const store = createLegendStore(async () => {
			throw new Error('no such group');
		}, onFailure, CEILING);
		store.pump();
		await settle();
		expect(store.read()).toEqual(NO_LEGENDS);
		expect(seen.length).toBe(STOPLIGHTS_SECTIONS.length);
	});

	test('a group that resolves to an empty legend is treated as not arrived', async () => {
		const { onFailure } = collectFailures();
		const store = createLegendStore(async () => '', onFailure, CEILING);
		store.pump();
		await settle();
		expect(store.read()).toEqual(NO_LEGENDS);
	});
});

describe('createLegendStore — the ceiling frees a read that never settles', () => {
	test('a read past the ceiling is reported as a failure naming its group', async () => {
		const { seen, onFailure } = collectFailures();
		const store = createLegendStore(never, onFailure, CEILING);
		store.pump();
		await Bun.sleep(CEILING * 3);
		expect(seen.sort()).toEqual([...STOPLIGHTS_SECTIONS].sort());
		expect(store.read()).toEqual(NO_LEGENDS);
	});

	test('a section freed by the ceiling is retried by the next pump, and can then land', async () => {
		let attempt = 0;
		const { onFailure } = collectFailures();
		const store = createLegendStore(
			(s) => {
				attempt += 1;
				return attempt <= STOPLIGHTS_SECTIONS.length
					? new Promise<string>(() => undefined)
					: Promise.resolve(LEGEND[s]);
			},
			onFailure,
			CEILING
		);
		store.pump();
		await Bun.sleep(CEILING * 3);
		expect(store.read()).toEqual(NO_LEGENDS);
		store.pump();
		await settle();
		expect(store.read()).toEqual(LEGEND);
	});
});

describe('createLegendStore — pumping does not re-ask for what it already holds', () => {
	test('a legend already held is not read again', async () => {
		let reads = 0;
		const { onFailure } = collectFailures();
		const store = createLegendStore(
			async (s) => {
				reads += 1;
				return LEGEND[s];
			},
			onFailure,
			CEILING
		);
		store.pump();
		await settle();
		store.pump();
		store.pump();
		await settle();
		expect(reads).toBe(STOPLIGHTS_SECTIONS.length);
	});

	test('a read still in flight is not started a second time', () => {
		let reads = 0;
		const { onFailure } = collectFailures();
		const store = createLegendStore(
			() => {
				reads += 1;
				return new Promise<string>(() => undefined);
			},
			onFailure,
			CEILING
		);
		store.pump();
		store.pump();
		store.pump();
		expect(reads).toBe(STOPLIGHTS_SECTIONS.length);
	});
});

describe('createLegendStore — a stale legend is read again', () => {
	test('a legend older than the ttl is read again on the next pump', async () => {
		let reads = 0;
		const { onFailure } = collectFailures();
		const store = createLegendStore(
			async (s) => {
				reads += 1;
				return LEGEND[s];
			},
			onFailure,
			CEILING,
			TTL
		);
		store.pump();
		await settle();
		expect(reads).toBe(STOPLIGHTS_SECTIONS.length);
		await Bun.sleep(TTL * 3);
		store.pump();
		await settle();
		expect(reads).toBe(STOPLIGHTS_SECTIONS.length * 2);
	});

	test('a reordered legend replaces the one already drawn', async () => {
		let reads = 0;
		const { onFailure } = collectFailures();
		const store = createLegendStore(
			async (s) => {
				reads += 1;
				return reads <= STOPLIGHTS_SECTIONS.length ? LEGEND[s] : REORDERED_UPKEEP;
			},
			onFailure,
			CEILING,
			TTL
		);
		store.pump();
		await settle();
		expect(store.read().upkeep).toBe(LEGEND.upkeep);
		await Bun.sleep(TTL * 3);
		store.pump();
		await settle();
		expect(store.read().upkeep).toBe(REORDERED_UPKEEP);
	});

	test('a refresh that fails leaves the legend already drawn standing', async () => {
		let reads = 0;
		const { seen, onFailure } = collectFailures();
		const store = createLegendStore(
			async (s) => {
				reads += 1;
				if (reads > STOPLIGHTS_SECTIONS.length) {
					throw new Error('the group would draw as an empty strip');
				}
				return LEGEND[s];
			},
			onFailure,
			CEILING,
			TTL
		);
		store.pump();
		await settle();
		await Bun.sleep(TTL * 3);
		store.pump();
		await settle();
		expect(store.read()).toEqual(LEGEND);
		expect(seen.length).toBe(STOPLIGHTS_SECTIONS.length);
	});

	test('a refresh that comes back empty leaves the legend already drawn standing', async () => {
		let reads = 0;
		const { onFailure } = collectFailures();
		const store = createLegendStore(
			async (s) => {
				reads += 1;
				return reads <= STOPLIGHTS_SECTIONS.length ? LEGEND[s] : '';
			},
			onFailure,
			CEILING,
			TTL
		);
		store.pump();
		await settle();
		await Bun.sleep(TTL * 3);
		store.pump();
		await settle();
		expect(store.read()).toEqual(LEGEND);
	});
});
