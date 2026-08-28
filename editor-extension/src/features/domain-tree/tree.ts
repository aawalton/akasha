import * as vscode from 'vscode';
import { filterTree, textMatches } from '../tree-filter.ts';
import { type DomainNode, type DomainTree, documentPath } from './harness.ts';

const OPEN_COMMAND = 'vscode.open';

export interface DomainTreeView {
	readonly provider: vscode.TreeDataProvider<DomainNode>;
	readonly replace: (tree: DomainTree) => undefined;
	readonly filter: (pattern: string) => undefined;
	readonly matchCount: () => number | undefined;
	readonly dispose: () => undefined;
}

export function createDomainTree(): DomainTreeView {
	const emitter = new vscode.EventEmitter<undefined>();
	let tree: DomainTree | undefined;
	let pattern = '';
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
		getChildren: (element?: DomainNode) => [
			...(element === undefined ? (narrowed ?? tree?.roots ?? []) : element.children),
		],
		getTreeItem: (element: DomainNode) => buildTreeItem(element, tree, narrowed !== undefined),
	};

	return {
		provider,
		replace: (next: DomainTree) => {
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

function buildTreeItem(element: DomainNode, tree: DomainTree | undefined, filtering: boolean): vscode.TreeItem {
	const label = element.position === null ? element.slug : `${element.position}-${element.slug}`;
	const item = new vscode.TreeItem(
		label,
		element.children.length === 0
			? vscode.TreeItemCollapsibleState.None
			: filtering
				? vscode.TreeItemCollapsibleState.Expanded
				: vscode.TreeItemCollapsibleState.Collapsed
	);
	item.id = filtering ? `filtered:${element.slug}` : element.slug;
	item.count = element.children.length === 0 ? undefined : element.children.length;
	item.description = element.persona ?? undefined;
	item.tooltip = [
		element.slug,
		element.persona === null ? 'no persona answers for this domain' : `Owned by ${element.persona}`,
		element.relPath,
	].join('\n');
	if (tree !== undefined) {
		item.command = {
			command: OPEN_COMMAND,
			title: 'Open this domain document',
			arguments: [vscode.Uri.file(documentPath(tree, element)), { preview: true }],
		};
	}
	return item;
}
