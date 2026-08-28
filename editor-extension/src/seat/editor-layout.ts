/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview The shaping that turns the editor's live tab groups into the arrangement
 * the pages system is sent.
 *
 * NOTHING HERE IMPORTS `vscode`. The shaping is exercised under bun with no workbench;
 * reading the tab groups is the caller's, in `../features/editor-layout/activate.ts`.
 */
import type { ColumnNumber } from './editor-group.ts';

/**
 * What kind of thing a tab holds.
 *
 * DELIBERATELY NOT A TERMINAL-ONLY SHAPE. An editor tab sits in a group exactly
 * the way a terminal does, and a record describing only terminals is one
 * somebody has to generalise later. `other` is the honest answer for a tab kind
 * this does not model rather than a reason to drop the tab — a group's contents
 * with the unmodelled tabs silently missing would be wrong rather than partial.
 */
export type TabKind = 'terminal' | 'text' | 'notebook' | 'diff' | 'webview' | 'other';

export interface LayoutTab {
	readonly kind: TabKind;
	/** What the tab shows. A display title, never an identity — see `seat`. */
	readonly label: string;
	/** The file a tab is showing, where it is showing one. */
	readonly uri?: string;
	/**
	 * The seat this tab is running, where it is running one.
	 *
	 * Resolved through the process tree rather than read off the label, so it is
	 * true for a tab nobody has looked at. A tab with no seat is not a defect: most
	 * tabs are files.
	 */
	readonly seat?: string;
	/**
	 * The shell process a terminal tab is running, as `page-property-type-process` states it.
	 *
	 * Absent for every tab that is not a terminal, and for a terminal whose pty host did not
	 * answer within the bound — the same terminals `identified` already drops. It is what a
	 * terminal page is keyed on, so a tab without it contributes no terminal page.
	 */
	readonly process?: string;
	readonly active: boolean;
}

export interface LayoutGroup {
	readonly column: ColumnNumber;
	readonly active: boolean;
	readonly tabs: readonly LayoutTab[];
}

/** One tab as the arrangement writer takes it. */
export interface ArrangementTab {
	readonly label: string;
	readonly active: boolean;
	readonly terminal?: string;
	readonly seat?: string;
}

/** One group as the arrangement writer takes it. */
export interface ArrangementGroup {
	readonly position: number;
	readonly active: boolean;
	readonly tabs: readonly ArrangementTab[];
}

/** One window's arrangement, in the shape the page query service's `/editor-arrangement` reads. */
export interface Arrangement {
	readonly window: string;
	readonly groups: readonly ArrangementGroup[];
}

/**
 * The arrangement these groups describe, for the writer that turns them into pages.
 *
 * A SEPARATE SHAPE RATHER THAN THE GROUPS THEMSELVES, because the two answer to different things.
 * The groups are this feature's own reading of the tab groups and may carry whatever a reader here
 * wants; the arrangement is what the page types in the instructions repository state, and a field
 * renamed there has to be renamed here rather than silently written under the old spelling.
 *
 * `column` becomes `position`. The editor's own word is a misnomer the moment groups are stacked
 * rather than laid side by side, and `page-types/code-editor-group.md` states the honest one.
 */
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
