/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { filterTree, textMatches } from '../tree-filter.ts';
import { TURN_SCHEME_PATH, turnColourIn } from '../turn-colour.ts';
import { type WorkNode, type WorkTree, documentPath } from './harness.ts';

/**
 * This panel's own uri scheme for the rows it colours.
 *
 * SEPARATE FROM THE AGENTS PANEL'S, though the two answer with the same colours. A
 * `FileDecorationProvider` is registered against the whole window and is asked about every uri the
 * workbench draws, so one shared scheme would have each panel's provider answering for the other's
 * rows, and the first to answer wins. A scheme apiece makes each provider's reach exactly its own
 * panel.
 */
const WORK_SCHEME = 'ops-work';

/**
 * The workbench's own verb for opening a resource, as the domain tree beside this one uses: opening
 * a file is a thing the editor already does, and a command here would be a name to register,
 * declare and keep — wrapping nothing.
 */
const OPEN_COMMAND = 'vscode.open';

export interface WorkTreeView {
	readonly provider: vscode.TreeDataProvider<WorkNode>;
	/** Swaps in a new tree and tells the view to re-read it. Nothing here reveals or selects a row. */
	readonly replace: (tree: WorkTree) => undefined;
	/** Narrows the tree to what the reader typed into the filter bar. Empty puts all of it back. */
	readonly filter: (pattern: string) => undefined;
	/** How many rows the current pattern matched, for the count beside the view's title. */
	readonly matchCount: () => number | undefined;
	readonly dispose: () => undefined;
}

/**
 * A READING SURFACE AND NOTHING MORE, as the Domains panel is. The Agents tree carries four
 * commands and every one of them is anchored on a seat having a running process to act on. An
 * initiative has none: it states an aim, and carrying it is a seat's work rather than a click's. So
 * there is no context menu here and no inline action — a row opens its document, and that is the
 * whole of what a row does.
 */
export function createWorkTree(): WorkTreeView {
	const emitter = new vscode.EventEmitter<undefined>();
	let tree: WorkTree | undefined;
	let pattern = '';
	/** The narrowed roots, computed when the pattern moves rather than per `getChildren`. */
	let narrowed: readonly WorkNode[] | undefined;
	let matched: number | undefined;

	const narrow = (): undefined => {
		if (pattern.trim() === '' || tree === undefined) {
			narrowed = undefined;
			matched = undefined;
			return undefined;
		}
		const result = filterTree<WorkNode>(
			tree.roots,
			(node) => node.children,
			// EVERY FIELD THE ROW SHOWS. An initiative's slug is in its label and the persona
			// answering for it in the detail, so a reader who can see a name on screen can type it.
			(node) => textMatches(pattern, node.label, node.detail, node.note),
			(node, children) => ({ ...node, children })
		);
		narrowed = result.roots;
		matched = result.matchCount;
		return undefined;
	};

	const provider: vscode.TreeDataProvider<WorkNode> = {
		onDidChangeTreeData: emitter.event,
		// The return type is inferred rather than annotated, and a fresh array is handed back each
		// call, for the reason the two trees beside this one state: VS Code demands a mutable array
		// here, and copying is what keeps a caller's mutation off the held tree.
		getChildren: (element?: WorkNode) => [
			...(element === undefined ? (narrowed ?? tree?.roots ?? []) : element.children),
		],
		getTreeItem: (element: WorkNode) => buildTreeItem(element, tree, narrowed !== undefined),
	};

	return {
		provider,
		replace: (next: WorkTree) => {
			tree = next;
			// RE-NARROWED ON EVERY READ, so a repository written while a filter stands does not put
			// the unfiltered tree back under the reader mid-type.
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

/**
 * A row's key in the view, unique across the whole tree.
 *
 * EVERY ROW IS AN INITIATIVE AND A SLUG IS UNIQUE ACROSS THEM, so the key alone separates two rows.
 * Two rows sharing a TreeItem.id make the workbench treat them as one row, so expanding either
 * expands both.
 */
function rowId(element: WorkNode): string {
	return element.key;
}

function buildTreeItem(element: WorkNode, tree: WorkTree | undefined, filtering: boolean): vscode.TreeItem {
	// EXPANDED WHILE A FILTER STANDS, for the reason the Domains panel states: every branch that
	// survived the filter is on the path to something the reader asked for.
	const item = new vscode.TreeItem(
		element.label,
		element.children.length === 0
			? vscode.TreeItemCollapsibleState.None
			: filtering
				? vscode.TreeItemCollapsibleState.Expanded
				: vscode.TreeItemCollapsibleState.Collapsed
	);
	// WHAT KEEPS AN EXPANDED BRANCH EXPANDED. VS Code tracks expansion against TreeItem.id, and a
	// refresh builds fresh objects, so without one every open branch would collapse under Alan on
	// each refresh.
	// A separate key space while filtering, for the reason the Domains panel states at length:
	// VS Code's memory of whether a row is open beats the state a later `getTreeItem` asks for.
	item.id = filtering ? `filtered:${rowId(element)}` : rowId(element);
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
	// The detail goes in `description` rather than into the label, because the two are different
	// questions — which initiative this is, and what it is about — and a pane narrow enough to drop
	// one should drop the second rather than truncate the first. An initiative's label is its slug,
	// which is the handle every command and every conversation names it by.
	item.description = element.detail ?? undefined;
	// A BLANK ICON RATHER THAN NONE, which is not the same as leaving this unset. A row carrying a
	// `resourceUri` is drawn with whatever the file icon theme has for that resource, and every
	// other row in the tree is then indented to line up with it — so leaving it unset gives a
	// document glyph to rows that stand for no document at all. `blank` is a codicon that draws
	// nothing, so the slot the tree already reserved stays reserved and the ink goes.
	item.iconPath = new vscode.ThemeIcon('blank');
	// WHAT CARRIES THE COLOUR. A TreeItem takes no foreground of its own, so the only way to tint a
	// row is a `resourceUri` a `FileDecorationProvider` can answer about. A row with no seat on it
	// gets no uri at all, which leaves it at the theme's own foreground rather than at some explicit
	// default that would drift from it.
	if (element.colour !== null) {
		item.resourceUri = vscode.Uri.from({
			scheme: WORK_SCHEME,
			path: `/${TURN_SCHEME_PATH}/${element.colour}/${rowId(element)}`,
		});
	}
	item.tooltip = [
		element.label,
		element.detail,
		// SAID ON THE ROW ITSELF. An initiative drawn as a root because its parent is not in this
		// tree looks exactly like one that declared no parent, and the difference is a fault in the
		// corpus rather than a fact about the initiative. The row that carries it is the only place
		// a reader is already looking.
		element.note,
		element.relPath ?? 'a sentinel, standing for what declared nothing — it opens no document',
	]
		.filter((line): line is string => line !== null)
		.join('\n');
	// A ROW OPENS ITS DOCUMENT, and that is the whole of what a row does. In preview, so that
	// reading down a branch replaces one tab rather than leaving a dozen behind.
	//
	// Guarded on the tree rather than assumed, because the path is only absolute once the verb has
	// said where the repository is; and guarded on the path, because a sentinel is a real row with
	// no document behind it, and opening `<repo>/null` would be worse than a row that does not open.
	const absolute = tree === undefined ? undefined : documentPath(tree, element);
	if (absolute !== undefined) {
		item.command = {
			command: OPEN_COMMAND,
			title: 'Open this document',
			arguments: [vscode.Uri.file(absolute), { preview: true }],
		};
	}
	return item;
}

/**
 * Paints a row in the colour of the seat working it, and leaves every other row alone.
 *
 * WHICH ROWS THOSE ARE IS THE VERB'S ANSWER. `ops memory work-tree` reads the seats, folds the
 * several that may hold one initiative down to the liveliest, and hangs a colour name on the row. A
 * join written here would be a second answer to which seat is on which initiative, free to drift
 * from the one the verb gives, and the one nobody watches.
 */
export function createWorkDecorationProvider(): vscode.FileDecorationProvider {
	return {
		provideFileDecoration: (uri: vscode.Uri) => {
			if (uri.scheme !== WORK_SCHEME) { return undefined; }
			const colour = turnColourIn(uri.path);
			return colour === undefined
				? undefined
				: new vscode.FileDecoration(undefined, undefined, new vscode.ThemeColor(colour));
		},
	};
}
