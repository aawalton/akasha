import type { SeatMode } from '../../seat/mode.ts';

export const SEAT_TAB_KEYS = {
	any: 'opsAgentTree.seatTabs',
	running: 'opsAgentTree.seatTabsRunning',
	stopped: 'opsAgentTree.seatTabsStopped',
	interactive: 'opsAgentTree.seatTabsInteractive',
	headless: 'opsAgentTree.seatTabsHeadless',
} as const;

export const SEAT_TAB_KEY_NAMES: readonly string[] = Object.values(SEAT_TAB_KEYS);

export interface SeatTabState {
	readonly instanceId: number;
	readonly live: boolean;
	readonly place: SeatMode | undefined;
}

export function seatTabContext(
	tabs: readonly SeatTabState[]
): Readonly<Record<string, readonly string[]>> {
	const values: Record<string, string[]> = {};
	for (const key of SEAT_TAB_KEY_NAMES) { values[key] = []; }
	for (const { instanceId, live, place } of tabs) {
		const id = String(instanceId);
		values[SEAT_TAB_KEYS.any].push(id);
		values[live ? SEAT_TAB_KEYS.running : SEAT_TAB_KEYS.stopped].push(id);
		values[SEAT_TAB_KEYS[place ?? 'headless']].push(id);
	}
	return values;
}
