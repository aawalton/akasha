/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { filterTree, textMatches } from '../tree-filter';
import { documentPath } from "./harness"
import { type PageNode, type PageTree } from "./assemble";

/**
 * The workbench's own command for opening a resource, as the two trees beside this one use: opening
 * a file is a thing the editor already does, and a command here would be a name to register,
 * declare and keep — wrapping nothing.
 */
const OPEN_COMMAND = 'vscode.open';

export interface PageTreeView {
	readonly provider: vscode.TreeDataProvider<PageNode>;
	/** Swaps in a new tree and tells the view to re-read it. Nothing here reveals or selects a row. */
	readonly replace: (tree: PageTree) => undefined;
	/** Narrows the tree to what the reader typed into the filter bar. Empty puts all of it back. */
	readonly filter: (pattern: string) => undefined;
	/** How many rows the current pattern matched, for the count beside the view's title. */
	readonly matchCount: () => number | undefined;
	readonly dispose: () => undefined;
}

/**
 * A READING SURFACE AND NOTHING MORE, as the Domains and Work panels are. The Agents tree
 * carries four commands and every one of them is anchored on a seat having a running process to act
 * on. A page type has none: changing one is a write into akasha, which is
 * gated on having read what governs it and is a seat's work rather than a click's. So there is no
 * context menu here and no inline action — a row opens its document, and that is the whole of what
 * a row does.
 */
export function createPageTree(): PageTreeView {
	const emitter = new vscode.EventEmitter<undefined>();
	let tree: PageTree | undefined;
	let pattern = '';
	/**
	 * The narrowed roots, computed when the pattern moves rather than per `getChildren`.
	 *
	 * VS Code asks for children one node at a time as it draws, so filtering inside that call would
	 * walk the tree once per visible row. The pattern changes far less often than the view draws.
	 */
	let narrowed: readonly PageNode[] | undefined;
	let matched: number | undefined;

	const narrow = (): undefined => {
		if (pattern.trim() === '' || tree === undefined) {
			narrowed = undefined;
			matched = undefined;
			return undefined;
		}
		const result = filterTree<PageNode>(
			tree.roots,
			(node) => node.children,
			// EVERY FIELD THE ROW SHOWS, so a reader filtering on something they can see on screen is
			// never told there are no results. `at` is deliberately not among them: it is in the
			// tooltip rather than on the row, so matching it would leave rows standing for a word
			// nothing on screen contains.
			(node) => textMatches(pattern, node.label, node.detail),
			(node, children) => ({ ...node, children })
		);
		narrowed = result.roots;
		matched = result.matchCount;
		return undefined;
	};

	const provider: vscode.TreeDataProvider<PageNode> = {
		onDidChangeTreeData: emitter.event,
		// The return type is inferred rather than annotated, and a fresh array is handed back each
		// call, for the reason the trees beside this one state: VS Code demands a mutable array here,
		// and copying is what keeps a caller's mutation off the held tree.
		getChildren: (element?: PageNode) => [
			...(element === undefined ? (narrowed ?? tree?.roots ?? []) : element.children),
		],
		getTreeItem: (element: PageNode) => buildTreeItem(element, tree, narrowed !== undefined),
	};

	return {
		provider,
		replace: (next: PageTree) => {
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

function buildTreeItem(element: PageNode, tree: PageTree | undefined, filtering: boolean): vscode.TreeItem {
	// EXPANDED WHILE A FILTER STANDS, collapsed otherwise. Every branch surviving the filter is on
	// the path to something the reader asked for, so leaving them shut would answer a search with a
	// row they have to open. Outside a filter the whole vocabulary is a few hundred rows, which is
	// why it is built collapsed the rest of the time.
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
	// each refresh. The command namespaces its ids across both roots, so nothing has to be added
	// here to keep a page type and a property type of the same name apart — and `parsePageTree`
	// refuses an answer where that promise is broken rather than letting two rows become one.
	// A SEPARATE KEY SPACE WHILE FILTERING, WITHOUT WHICH THE ROWS STAY SHUT. VS Code remembers
	// whether a row is open against this id, and its memory beats whatever `collapsibleState` a later
	// `getTreeItem` returns — so asking for Expanded on a root the reader left collapsed changes
	// nothing, and a filter matching eight rows draws one closed row. Filtered rows are new ids, so
	// there is nothing remembered about them and Expanded is honoured. It also means the reader's own
	// expansion survives underneath: clearing the bar puts back the tree they had, not a wall of
	// opened branches.
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
	// The detail goes in `description` rather than into the label, because the two are different
	// questions — which page type this is, and what it claims — and a pane narrow enough to drop one
	// should drop the answer rather than truncate the subject.
	item.description = element.detail ?? undefined;
	item.tooltip = [
		element.label,
		element.detail,
		element.at,
	]
		.filter((line): line is string => line !== null)
		.join('\n');
	// A ROW OPENS ITS DOCUMENT, and that is the whole of what a row does. In preview, so that reading
	// down a branch replaces one tab rather than leaving a dozen behind.
	//
	// Guarded on the tree, because the path is only absolute once the command has said where the
	// repository is: a row can exist before that is known, and opening `undefined/pages/page-type/x.page-type.md`
	// would be worse than a row that does not open. And guarded on the path, because a row with no
	// `at` is a grouping row standing for a document that does not exist — giving it a command
	// would offer Alan a click that opens `<repo>/null`, which is a worse answer than no click.
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
