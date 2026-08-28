import { STOPLIGHTS_SECTIONS, type StoplightsSection } from './slot-types.ts';

export const LEGEND_CEILING_MS = 30_000;

export const LEGEND_TTL_MS = 60_000;

export type StoplightLegends = Readonly<Record<StoplightsSection, string | undefined>>;

export const NO_LEGENDS: StoplightLegends = {
	inbox: undefined,
	upkeep: undefined,
	daily: undefined,
};

export type LegendRead = (section: StoplightsSection) => Promise<string>;

export type LegendFailure = (section: StoplightsSection, reason: unknown) => undefined;

export type LegendStore = {
	readonly read: () => StoplightLegends;
	readonly pump: () => undefined;
};

function withCeiling(
	section: StoplightsSection,
	loading: Promise<string>,
	ceilingMs: number
): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(
				new Error(
					`the ${section} legend did not resolve within ${ceilingMs}ms; the group draws its reading without one`
				)
			);
		}, ceilingMs);
		loading.then(
			(legend) => { clearTimeout(timer); resolve(legend); },
			(reason) => { clearTimeout(timer); reject(reason); }
		);
	});
}

export function createLegendStore(
	load: LegendRead,
	onFailure: LegendFailure,
	ceilingMs: number = LEGEND_CEILING_MS,
	ttlMs: number = LEGEND_TTL_MS
): LegendStore {
	let legends: StoplightLegends = NO_LEGENDS;
	const heldAt = new Map<StoplightsSection, number>();
	const inFlight = new Set<StoplightsSection>();

	const wanted = (section: StoplightsSection): boolean => {
		if (legends[section] === undefined) { return true; }
		const at = heldAt.get(section);
		return at === undefined || Date.now() - at >= ttlMs;
	};

	const pump = (): undefined => {
		for (const section of STOPLIGHTS_SECTIONS) {
			if (inFlight.has(section) || !wanted(section)) { continue; }
			inFlight.add(section);
			void withCeiling(section, load(section), ceilingMs).then(
				(legend) => {
					inFlight.delete(section);
					if (legend === '') { return; }
					legends = { ...legends, [section]: legend };
					heldAt.set(section, Date.now());
				},
				(reason) => {
					inFlight.delete(section);
					onFailure(section, reason);
				}
			);
		}
		return undefined;
	};

	return { read: () => legends, pump };
}
