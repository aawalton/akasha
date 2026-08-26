/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, expect, test } from 'bun:test';
import { createLegendStore, type LegendRead, NO_LEGENDS } from './legends';
import { STOPLIGHTS_SECTIONS, type StoplightsSection } from './slot-types';

// Legends as they come back from the readout documents. FIXTURE data — the loader
// never inspects a legend's contents, so what these say does not matter to it, only
// that the three are distinguishable.
const LEGEND: Readonly<Record<StoplightsSection, string>> = {
	upkeep: 'Plants · Activity · Sleep · Surplus · Capacity · Safety',
	inbox: 'email · tasks · temper-tasks · unread-texts · questions',
	daily: 'Faith · Love · Health · Learn · Fun · Wealth',
};

const CEILING = 50;

// Short enough that a test can age a legend out by sleeping, and well clear of the
// microtask settles the landing tests use, so nothing goes stale mid-assertion.
const TTL = 20;

// The same six readouts the upkeep fixture names, in a different order — a `place`
// reordering as the readout documents deliver it, which is the case that pinning a
// legend for the life of the window loses.
const REORDERED_UPKEEP = 'Safety · Surplus · Capacity · Plants · Activity · Sleep';

// A read that never settles — the case the ceiling exists for, and the one a plain
// `.then` cannot tell apart from a slow one.
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

// `pump` starts work and returns; letting the microtask queue drain is how a test
// observes what has landed, standing in for the next five-second poll.
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
		// The read has not settled and never will; the store still answers.
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

// ONE GROUP'S FAILURE IS ONE GROUP'S TOOLTIP. This is the whole failure contract:
// whatever a legend read does, the other groups keep theirs and nothing is thrown
// at the caller, because the caller is a status-bar poll that must go on drawing.
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

// A read that never settles would otherwise hold its section in flight for the life
// of the window, so the group would never get a legend and would never try again.
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

// Resolving a group is the expensive call in this feature. Pumping every five
// seconds must not mean resolving every five seconds.
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

// A LEGEND NAMES AN ORDER THE DOCUMENTS OWN. Reordering a group's readouts moves the
// circles on the next poll; a legend pinned for the life of the window keeps naming
// the old order beside them, which reads as a reordering that never landed.
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
