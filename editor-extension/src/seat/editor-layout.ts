import type { ColumnNumber } from './editor-group.ts';

export type TabKind = 'terminal' | 'text' | 'notebook' | 'diff' | 'webview' | 'other';

export interface LayoutTab {
	readonly kind: TabKind;
	readonly label: string;
	readonly uri?: string;
	readonly seat?: string;
	readonly process?: string;
	readonly active: boolean;
}

export interface LayoutGroup {
	readonly column: ColumnNumber;
	readonly active: boolean;
	readonly tabs: readonly LayoutTab[];
}

export interface ArrangementTab {
	readonly label: string;
	readonly active: boolean;
	readonly terminal?: string;
	readonly seat?: string;
}

export interface ArrangementGroup {
	readonly position: number;
	readonly active: boolean;
	readonly tabs: readonly ArrangementTab[];
}

export interface Arrangement {
	readonly window: string;
	readonly groups: readonly ArrangementGroup[];
}

export function arrangementFrom(groups: readonly LayoutGroup[], window: string): Arrangement {
	return {
		window,
		groups: groups.map((group) => ({
			position: group.column,
			active: group.active,
			tabs: group.tabs.map((tab) => ({
				label: tab.label,
				active: tab.active,
				...(tab.process === undefined ? {} : { terminal: tab.process }),
				...(tab.seat === undefined ? {} : { seat: tab.seat }),
			})),
		})),
	};
}
