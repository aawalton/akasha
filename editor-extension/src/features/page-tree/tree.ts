import * as vscode from 'vscode';
import { filterTree, textMatches } from '../tree-filter.ts';
import { documentPath } from "./harness.ts"
import { type PageNode, type PageTree } from "./assemble.ts";

const OPEN_COMMAND = 'vscode.open';

export interface PageTreeView {
	readonly provider: vscode.TreeDataProvider<PageNode>;
	readonly replace: (tree: PageTree) => undefined;
	readonly filter: (pattern: string) => undefined;
	readonly matchCount: () => number | undefined;
	readonly dispose: () => undefined;
}

export function createPageTree(): PageTreeView {
	const emitter = new vscode.EventEmitter<undefined>();
	let tree: PageTree | undefined;
	let pattern = '';
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
			(node) => textMatches(pattern, node.label, node.detail),
			(node, children) => ({ ...node, children })
		);
		narrowed = result.roots;
		matched = result.matchCount;
		return undefined;
	};

	const provider: vscode.TreeDataProvider<PageNode> = {
		onDidChangeTreeData: emitter.event,
		getChildren: (element?: PageNode) => [
			...(element === undefined ? (narrowed ?? tree?.roots ?? []) : element.children),
		],
		getTreeItem: (element: PageNode) => buildTreeItem(element, tree, narrowed !== undefined),
	};

	return {
		provider,
		replace: (next: PageTree) => {
			tree = next;
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
	const item = new vscode.TreeItem(
		element.label,
		element.children.length === 0
			? vscode.TreeItemCollapsibleState.None
			: filtering
				? vscode.TreeItemCollapsibleState.Expanded
				: vscode.TreeItemCollapsibleState.Collapsed
	);
	item.id = filtering ? `filtered:${element.id}` : element.id;
	item.count = element.children.length === 0 ? undefined : element.children.length;
	item.description = element.detail ?? undefined;
	item.tooltip = [
		element.label,
		element.detail,
		element.at,
	]
		.filter((line): line is string => line !== null)
		.join('\n');
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
