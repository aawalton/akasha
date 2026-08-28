/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { filterTree, textMatches } from '../tree-filter.ts';
import { type DomainNode, type DomainTree, documentPath } from './harness.ts';

/**
 * The workbench's own verb for opening a resource. Used rather than a command of this
 * extension's, because opening a file is a thing the editor already does and a command
 * here would be a name to register, declare and keep — wrapping nothing.
 */
const OPEN_COMMAND = 'vscode.open';

export interface DomainTreeView {
	readonly provider: vscode.TreeDataProvider<DomainNode>;
	/** Swaps in a new tree and tells the view to re-read it. Nothing here reveals or selects a row. */
	readonly replace: (tree: DomainTree) => undefined;
	/** Narrows the tree to what the reader typed into the filter bar. Empty puts all of it back. */
	readonly filter: (pattern: string) => undefined;
	/** How many domains the current pattern matched, for the count beside the view's title. */
	readonly matchCount: () => number | undefined;
	readonly dispose: () => undefined;
}

/**
 * A READING SURFACE AND NOTHING MORE. The Agents tree beside this one carries four
 * commands — place interactive, place headless, stop, bring back — and every one of them
 * is anchored on a seat having a running process to act on. A domain has none. So there is
 * no context menu here and no inline action: a row opens its document, and that is the
 * whole of what a row does.
 */
export function createDomainTree(): DomainTreeView {
	const emitter = new vscode.EventEmitter<undefined>();
	let tree: DomainTree | undefined;
	let pattern = '';
	/**
	 * The narrowed roots, computed when the pattern moves rather than per `getChildren`.
	 *
	 * VS Code asks for children one node at a time as it draws, so filtering inside that call would
	 * walk the corpus once per visible row. The pattern changes far less often than the view draws.
	 */
	let narrowed: readonly DomainNode[] | undefined;
	let matched: number | undefined;

	const narrow = (): undefined => {
		if (pattern.trim() === '' || tree === undefined) {
			narrowed = undefined;
			matched = undefined;
			return undefined;
		}
		const result = filterTree<DomainNode>(
			tree.roots,
			(node) => node.children,
			(node) => textMatches(pattern, node.slug, node.persona),
			(node, children) => ({ ...node, children })
		);
		narrowed = result.roots;
		matched = result.matchCount;
		return undefined;
	};

	const provider: vscode.TreeDataProvider<DomainNode> = {
		onDidChangeTreeData: emitter.event,
		// The return type is inferred rather than annotated, and a fresh array is handed
		// back each call, for the reason the agent tree states: VS Code demands a mutable
		// array here, and copying is what keeps a caller's mutation off the held tree.
		getChildren: (element?: DomainNode) => [
			...(element === undefined ? (narrowed ?? tree?.roots ?? []) : element.children),
		],
		getTreeItem: (element: DomainNode) => buildTreeItem(element, tree, narrowed !== undefined),
	};

	return {
		provider,
		replace: (next: DomainTree) => {
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

function buildTreeItem(element: DomainNode, tree: DomainTree | undefined, filtering: boolean): vscode.TreeItem {
	// EXPANDED WHILE A FILTER STANDS, collapsed otherwise. Every branch surviving the filter is on
	// the path to something the reader asked for, so leaving them shut would answer a search with a
	// row they have to open. Outside a filter the same tree is a couple of thousand rows, which is
	// why it is built collapsed the rest of the time.
	// PREFIXED WITH ITS PLACE WHERE ITS PARENT SEQUENCED IT, so the ordered block is legible as
	// ordered rather than as an arbitrary shuffle of the alphabet. Only sequenced rows carry one,
	// which is what makes the boundary between the sequence and the alphabetical remainder visible
	// without a separator row. `item.id` and the filter still key off the bare slug below: the
	// prefix is a rendering, not part of the name.
	const label = element.position === null ? element.slug : `${element.position}-${element.slug}`;
	const item = new vscode.TreeItem(
		label,
		element.children.length === 0
			? vscode.TreeItemCollapsibleState.None
			: filtering
				? vscode.TreeItemCollapsibleState.Expanded
				: vscode.TreeItemCollapsibleState.Collapsed
	);
	// WHAT KEEPS AN EXPANDED BRANCH EXPANDED. VS Code tracks expansion against
	// TreeItem.id, and a refresh builds fresh objects, so without one every open branch
	// would collapse under Alan on each refresh. A slug is unique across the corpus by
	// construction — akasha refuses a second document declaring one —
	// and it appears once in this tree, which is what makes it usable as the key.
	// A SEPARATE KEY SPACE WHILE FILTERING, WITHOUT WHICH THE ROWS STAY SHUT. VS Code remembers
	// whether a row is open against this id, and its memory beats whatever `collapsibleState` a
	// later `getTreeItem` returns — so asking for Expanded on `global`, which the reader left
	// collapsed, changed nothing and a filter matching a handful of domains drew one closed row,
	// the title counting matches over a tree that stayed shut. Filtered rows are new ids, so there is
	// nothing remembered about them and Expanded is honoured. It also means the reader's own
	// expansion survives underneath: clearing the bar puts back the tree they had, not a wall of
	// opened branches.
	item.id = filtering ? `filtered:${element.slug}` : element.slug;
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
	// The persona goes in `description` rather than into the label, because the two are
	// different questions — what this domain is, and who answers for it — and a pane
	// narrow enough to drop one should drop the answer rather than truncate the subject.
	item.description = element.persona ?? undefined;
	item.tooltip = [
		element.slug,
		element.persona === null ? 'no persona answers for this domain' : `Owned by ${element.persona}`,
		element.relPath,
	].join('\n');
	// A ROW OPENS ITS DOCUMENT, and that is the whole of what a row does. In preview, so
	// that reading down a branch replaces one tab rather than leaving a dozen behind.
	//
	// Guarded on the tree rather than assumed, because the path is only absolute once the
	// verb has said where the repository is: a row can exist before that is known, and
	// opening `undefined/pages/domain/x.domain.md` would be worse than a row that does not open.
	if (tree !== undefined) {
		item.command = {
			command: OPEN_COMMAND,
			title: 'Open this domain document',
			arguments: [vscode.Uri.file(documentPath(tree, element)), { preview: true }],
		};
	}
	return item;
}
