import type { UsageReading } from './usage.ts';

export type UsageSlotDef = {
	readonly kind: 'usage';
	readonly id: string;
	readonly priority: number;
	readonly label: string;
	readonly hex: string;
	readonly read: (u: UsageReading) => string;
};

export type SeparatorSlotDef = {
	readonly kind: 'separator';
	readonly id: string;
	readonly priority: number;
};

export const STOPLIGHTS_SECTIONS = ['inbox', 'upkeep', 'daily'] as const;

export type StoplightsSection = (typeof STOPLIGHTS_SECTIONS)[number];

export type StoplightsSlotDef = {
	readonly kind: 'stoplights';
	readonly id: string;
	readonly priority: number;
	readonly section: StoplightsSection;
};

export type SlotDef = UsageSlotDef | SeparatorSlotDef | StoplightsSlotDef;
