import type { DailyValues, ValueFace } from '../../../../readouts/daily-stoplights.ts';
import type * as vscode from 'vscode';
import type { StoplightLegends } from './legends.ts';
import { SLOTS } from './slots.ts';
import type { UsageReading } from './usage.ts';

export type SectionResult<T> = {
	readonly value: T | undefined;
	readonly stale: boolean;
	readonly lastFreshAt: number | undefined;
};

export type SettledReads = {
	readonly daily: SectionResult<DailyValues>;
	readonly inbox: SectionResult<string>;
	readonly upkeep: SectionResult<string>;
	readonly usage: SectionResult<UsageReading>;
};

export type ReadOutcomes = {
	readonly daily: PromiseSettledResult<DailyValues>;
	readonly inbox: PromiseSettledResult<string>;
	readonly upkeep: PromiseSettledResult<string>;
	readonly usage: PromiseSettledResult<UsageReading>;
};

export type FreshAts = {
	readonly daily: number | undefined;
	readonly inbox: number | undefined;
	readonly upkeep: number | undefined;
	readonly usage: number | undefined;
};

export type RenderItem = {
	text: string;
	tooltip: string | vscode.MarkdownString | undefined;
};

function settleSection<T>(
	settled: PromiseSettledResult<T>,
	prevFreshAt: number | undefined,
	now: number
): SectionResult<T> {
	if (settled.status === 'fulfilled') {
		return { value: settled.value, stale: false, lastFreshAt: now };
	}
	return { value: undefined, stale: true, lastFreshAt: prevFreshAt };
}

export function settleReads(outcomes: ReadOutcomes, prev: FreshAts, now: number): SettledReads {
	return {
		daily: settleSection(outcomes.daily, prev.daily, now),
		inbox: settleSection(outcomes.inbox, prev.inbox, now),
		upkeep: settleSection(outcomes.upkeep, prev.upkeep, now),
		usage: settleSection(outcomes.usage, prev.usage, now),
	};
}

function formatStaleSuffix(stale: boolean, lastFreshAt: number | undefined): string {
	if (!stale) { return ''; }
	if (lastFreshAt !== undefined) {
		const t = new Date(lastFreshAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		return ` (stale since ${t})`;
	}
	return ' (stale — no successful poll yet)';
}

function faceTooltip(faces: readonly ValueFace[]): string {
	return faces.map((f) => f.face ?? '—').join(' · ');
}

function legendTooltip(legend: string | undefined, suffix: string): string | undefined {
	const shown = `${legend ?? ''}${suffix}`.trim();
	return shown === '' ? undefined : shown;
}

export function applyToItems(
	items: readonly RenderItem[],
	reads: SettledReads,
	legends: StoplightLegends
): undefined {
	for (let i = 0; i < SLOTS.length; i++) {
		const slot = SLOTS[i];
		const item = items[i];
		if (slot.kind === 'separator') {
		} else if (slot.kind === 'usage') {
			const section = reads.usage;
			const suffix = formatStaleSuffix(section.stale, section.lastFreshAt);
			const text = section.value === undefined ? undefined : slot.read(section.value);
			item.text = text === undefined ? item.text : text;
			item.tooltip = `${slot.label}${suffix}`;
		} else if (slot.kind === 'stoplights') {
			const section = reads[slot.section];
			const suffix = formatStaleSuffix(section.stale, section.lastFreshAt);
			const value = section.value;
			const legend = legends[slot.section];
			if (value === undefined) {
				item.tooltip = legendTooltip(legend, suffix);
			} else if (typeof value === 'string') {
				item.text = value;
				item.tooltip = legendTooltip(legend, suffix);
			} else {
				item.text = value.glyphs;
				item.tooltip = `${faceTooltip(value.faces)}${suffix}`;
			}
		}
	}
	return undefined;
}
