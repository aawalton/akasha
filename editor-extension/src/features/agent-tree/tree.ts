/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { filterTree, textMatches } from '../tree-filter.ts';
import type { AgentNode } from './forest.ts';
import { turnColourIn, turnStateSaid } from '../turn-colour.ts';
import { seatContextValue } from './toggles.ts';

export const REVEAL_TERMINAL_COMMAND = 'opsAgentTree.revealTerminal';

/**
 * What a click hands the command.
 *
 * Both fields, because the two halves of a click need different keys. Bringing a
 * terminal forward matches on the seat NAME — that is all a supervisor entry
 * carries — while opening a transcript needs the row ID, which is what the
 * seat's page states as its `id`.
 */
export interface SeatClick {
	readonly id: string;
	readonly name: string;
}

/**
 * The scheme carrying a stopped ancestor's decoration. A URI is the only handle a
 * `FileDecorationProvider` takes, and this one names no file — it exists so the
 * decoration provider below can recognise the rows it colours.
 */
export const AGENT_SCHEME = 'ops-agent';

export interface AgentTree {
	readonly provider: vscode.TreeDataProvider<AgentNode>;
	/**
	 * Swaps in a new forest and tells the tree to re-read it.
	 *
	 * Firing the event is the whole of a refresh. Nothing here reveals or selects a
	 * row: `TreeView.reveal` moves keyboard focus into the tree, which would take it
	 * off whatever Alan is typing into, on a timer he did not ask for.
	 */
	readonly replace: (roots: readonly AgentNode[]) => undefined;
	/** Narrows the tree to what the reader typed into the filter bar. Empty puts all of it back. */
	readonly filter: (pattern: string) => undefined;
	/** How many seats the current pattern matched, for the count beside the view's title. */
	readonly matchCount: () => number | undefined;
	readonly dispose: () => undefined;
}

export function createAgentTree(): AgentTree {
	const emitter = new vscode.EventEmitter<undefined>();
	let roots: readonly AgentNode[] = [];
	let pattern = '';
	/** The narrowed roots, computed when the pattern moves rather than per `getChildren`. */
	let narrowed: readonly AgentNode[] | undefined;
	let matched: number | undefined;

	const narrow = (): undefined => {
		if (pattern.trim() === '') {
			narrowed = undefined;
			matched = undefined;
			return undefined;
		}
		// MATCHED ON THE NAME ALONE, because a seat's name already spells every attribute it states
		// — persona, domain, role and assignment — so filtering the name filters on all of them.
		const result = filterTree<AgentNode>(
			roots,
			(node) => node.children,
			(node) => textMatches(pattern, node.name),
			(node, children) => ({ ...node, children })
		);
		narrowed = result.roots;
		matched = result.matchCount;
		return undefined;
	};

	const provider: vscode.TreeDataProvider<AgentNode> = {
		onDidChangeTreeData: emitter.event,
		// The return type is inferred rather than annotated. VS Code's
		// `TreeDataProvider` demands a mutable array here, which an annotation could
		// only spell in the form the readonly-collections gate exists to keep out of
		// boundaries. The vector that gate guards — a caller mutating an array that
		// aliases internal state — is closed by construction instead: this hands back
		// a fresh copy each call, so nothing done to it reaches the roots.
		getChildren: (element?: AgentNode) => [...(element === undefined ? (narrowed ?? roots) : element.children)],
		getTreeItem: (element: AgentNode) => buildTreeItem(element, narrowed !== undefined),
	};

	return {
		provider,
		replace: (next: readonly AgentNode[]) => {
			roots = next;
			// RE-NARROWED ON EVERY READ. This view re-reads every ten seconds, so a filter that was
			// not reapplied would put the whole fleet back under the reader within one tick.
			narrow();
			emitter.fire(undefined);
			return undefined;
		},
		filter: (next: string) => {
			if (next === pattern) {
				return undefined;
			}
			pattern = next;
			narrow();
			emitter.fire(undefined);
			return undefined;
		},
		matchCount: () => matched,
		dispose: () => {
			emitter.dispose();
			return undefined;
		},
	};
}

function buildTreeItem(element: AgentNode, filtering: boolean): vscode.TreeItem {
	// EXPANDED WHILE A FILTER STANDS, for the reason the Domains panel states: an ancestor kept by
	// the filter is only there to carry a match under it, so leaving it shut hides the answer.
	const item = new vscode.TreeItem(
		element.name,
		element.children.length === 0
			? vscode.TreeItemCollapsibleState.None
			: filtering
				? vscode.TreeItemCollapsibleState.Expanded
				: vscode.TreeItemCollapsibleState.Collapsed
	);
	// WHAT KEEPS AN EXPANDED ROW EXPANDED. VS Code tracks expansion against
	// TreeItem.id; without one it keys on the item's own identity, and a refresh
	// builds fresh objects, so every expanded branch would collapse under Alan on
	// each poll. The agent id is stable across refreshes and unique in the tree.
	// A separate key space while filtering, for the reason the Domains panel states at length:
	// VS Code's memory of whether a row is open beats the state a later `getTreeItem` asks for.
	item.id = filtering ? `filtered:${element.id}` : element.id;
	// HOW MANY ROWS THIS ONE OPENS TO, carried as its own span rather than folded into
	// `description`. A bare number in `description` reads LARGER than a lowercase description
	// beside it — digits sit at full cap-height where `-slug` and `text` do not — so the number
	// that is chrome looked like the answer. `count` is drawn smaller than a description on
	// purpose.
	//
	// A LEAF CARRIES NONE. `0` and "there is nothing under this" are the same fact, and the row
	// already says it by not opening; a `0` on every leaf would be noise on the majority of rows.
	//
	// UNDER A FILTER THIS COUNTS WHAT SURVIVED IT, which is what the row will actually open to.
	// A count of the unfiltered children would promise rows the reader cannot reach from here.
	item.count = element.children.length === 0 ? undefined : element.children.length;
	// A BLANK ICON RATHER THAN NONE, which is not the same as leaving this unset. A row carrying a
	// `resourceUri` is drawn with whatever the file icon theme has for that resource, and every
	// other row in the tree is then indented to line up with it — so leaving it unset gives a
	// document glyph to rows that stand for no document at all. `blank` is a codicon that draws
	// nothing, so the slot the tree already reserved stays reserved and the ink goes.
	item.iconPath = new vscode.ThemeIcon('blank');
	// The whole name goes in the label and nothing is split into `description`, so
	// a narrowing pane ellipsises the one string rather than dropping part of the
	// name outright.
	// The two toggles' own state rides in the tooltip rather than a second column,
	// for the reason the name is not split into `description`: a column is the part a
	// narrowing pane drops.
	item.tooltip =
		element.kind === 'subagent'
			? element.name
			: [
				element.name,
				`${element.live ? 'Running' : 'Stopped'}, ${element.place ?? 'headless'}`,
				turnStateSaid(element.state, element.waitingOn),
			].filter((line): line is string => line !== undefined).join('\n');
	// WHAT A ROW IS AND WHAT STATE IT IS IN ARE BOTH CARRIED IN THE PATH. Colouring is a
	// FileDecorationProvider's to do and it needs a resourceUri to attach to — the mechanism the
	// file explorer greys a gitignored file with — so the first segment says which kind of row
	// asked and the second, where there is one, says the colour its state is drawn in.
	//
	// A SUBAGENT IS COLOURED FOR ITS TURN, exactly as a seat is: it is an agent, it takes a turn
	// of its own, and it is on this tree only while that turn is running. It keeps its badge, so
	// the two are still told apart on the row rather than by their colour.
	//
	// A SUBAGENT WITH NO COLOUR falls back to the two-segment form, which carries no colour segment
	// and so is drawn in the theme's own text colour. That is what a harness the panel could not
	// reach leaves behind.
	if (element.kind === 'subagent') {
		item.resourceUri = vscode.Uri.from({
			scheme: AGENT_SCHEME,
			path:
				element.colour === undefined
					? `/subagent/${element.id}`
					: `/subagent/${element.colour}/${element.id}`,
		});
	} else if (!element.live) {
		item.resourceUri = vscode.Uri.from({ scheme: AGENT_SCHEME, path: `/stopped/${element.id}` });
	} else if (element.colour !== undefined) {
		item.resourceUri = vscode.Uri.from({
			scheme: AGENT_SCHEME,
			path: `/turn/${element.colour}/${element.id}`,
		});
	}
	// A SEAT ROW SPELLS BOTH AXES; A SUBAGENT SPELLS NEITHER. Each toggle's `when`
	// clause matches one axis of the seat form and ignores the other, which is what
	// lets the two be offered separately over one row. A subagent is not a seat —
	// `ops seat stop` does not address one — so it keeps the bare word and every
	// clause, anchored on `seat.`, passes it by.
	item.contextValue =
		element.kind === 'subagent'
			? 'subagent'
			: seatContextValue(element.live, element.place ?? 'headless');
	// A SUBAGENT ROW CARRIES NO COMMAND. It has no terminal of its own, and what a
	// click on one should do is nobody's decision yet — a row that half-acts is
	// worse than one that does nothing. A subagent also has no agent row and no
	// session sentinel, so the transcript half below would have nothing to open.
	if (element.kind === 'seat') {
		const clicked: SeatClick = { id: element.id, name: element.name };
		item.command = {
			command: REVEAL_TERMINAL_COMMAND,
			// What the click does either way, rather than the terminal half alone: a
			// seat with no terminal here opens its transcript instead, so a title
			// naming only the terminal would describe the wrong half of the time.
			title: 'Show what this seat is doing',
			arguments: [clicked],
		};
	}
	return item;
}

/**
 * Paints every row that asked for a colour, and badges the two kinds that say what they are.
 *
 * AN AGENT TAKES ITS TURN STATE'S COLOUR, seat and subagent alike. Which colour that is stands in
 * the instructions repository on the state's own domain; this end holds only what the palette
 * calls the name.
 *
 * THE BADGE AND THE COLOUR ARE READ OFF THE PATH SEPARATELY, and that is what lets a subagent be
 * both green and labelled. The prefix says which kind asked and survives the row gaining a
 * colour; the colour segment is what the state added.
 *
 * DEAD BEATS IDLE, and the order the paths are built in is where that is decided. A stopped seat
 * is not in a turn state at all, so it is given no colour segment rather than being painted for a
 * turn it stopped taking.
 *
 * A ROW WITH NO COLOUR IS LEFT UNPAINTED rather than dimmed, so it takes the theme's own text
 * colour. Dimming it here would disagree with its tab, which paints nothing for the same seat:
 * the two agree by both declining to name a shade, and neither can drift from the other.
 */
export function createAgentDecorationProvider(): vscode.FileDecorationProvider {
	return {
		provideFileDecoration: (uri: vscode.Uri) => {
			if (uri.scheme !== AGENT_SCHEME) { return undefined; }
			const badge = uri.path.startsWith('/subagent/')
				? 'Subagent'
				: uri.path.startsWith('/stopped/')
					? 'Stopped'
					: undefined;
			const turn = turnColourIn(uri.path);
			return new vscode.FileDecoration(
				undefined,
				badge,
				turn === undefined ? undefined : new vscode.ThemeColor(turn)
			);
		},
	};
}
