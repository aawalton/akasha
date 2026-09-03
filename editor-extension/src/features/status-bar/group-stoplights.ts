import { type Stoplight, stoplightsInGroup } from '@akasha/readout-system/readout-group-serving';
import { readingHeldOn } from '@akasha/readout-system/readout-serving';

/**
 * The colors a readout group shows, read the way the iOS widgets read them.
 *
 * `stoplightsInGroup` is the same body `/api/habit-stoplights` and `/api/inbox-stoplights` answer
 * from, so which readouts a group holds, the label each carries, the scale each is read against
 * and the color a reading lands on are read off the readout pages rather than named here.
 *
 * The pod hands that body the reading a workstation relayed to it, because a reading is never
 * committed and so never reaches a pod any other way. Here the reading is already beside its own
 * page: the reading services on this machine keep it there, and the store answers it on the
 * readout's own row. So the reading is handed in off the row and this needs no credential and no
 * network beyond the store this workstation already runs.
 */
const ON_THE_WORKSTATION = 'http://127.0.0.1:8787';

const LEGEND_SEPARATOR = ' · ';

const GLYPH: Readonly<Record<Stoplight['tier'], string>> = {
	black: '⚫',
	red: '🔴',
	orange: '🟠',
	yellow: '🟡',
	green: '🟢',
	blue: '🔵',
};

/**
 * `originOf` in `page-calling` reads `PAGES_SERVICE_ORIGIN` and then `PAGE_STORE_ORIGIN`, and
 * where neither is named it falls back to the in-cluster name a pod reaches the service by. That
 * name resolves to nothing on this machine, so the loopback the service binds is named here and
 * reached only where the environment names no origin of its own.
 */
export function nameTheStore(): undefined {
	process.env.PAGES_SERVICE_ORIGIN ??= ON_THE_WORKSTATION;
	return undefined;
}

export function readGroup(groupSlug: string): Promise<readonly Stoplight[]> {
	nameTheStore();
	return stoplightsInGroup(groupSlug, 'habit', readingHeldOn);
}

export function glyphsOf(stoplights: readonly Stoplight[]): string {
	return stoplights.map((one) => GLYPH[one.tier]).join('');
}

export function legendOf(stoplights: readonly Stoplight[]): string {
	return stoplights.map((one) => one.label).join(LEGEND_SEPARATOR);
}

export type GroupDrawing = {
	readonly glyphs: string;
	readonly legend: string;
};

/**
 * ONE READING OF A GROUP, PROJECTED TWICE.
 *
 * The glyph row and the tooltip's legend are two readings of the same `Stoplight[]`: `glyphsOf`
 * takes each stoplight's tier, `legendOf` takes each stoplight's label. Nothing else differs.
 *
 * They used to be fetched apart. A poll read both groups for their glyphs, and `legendStore.pump()`
 * read the same two groups again for their labels, so every other poll asked the store for four
 * readings where two answer — and the second pair was issued concurrently with the first, against
 * the same service, for bytes already in flight.
 */
export async function drawGroup(groupSlug: string): Promise<GroupDrawing> {
	const stoplights = await readGroup(groupSlug);
	return { glyphs: glyphsOf(stoplights), legend: legendOf(stoplights) };
}
