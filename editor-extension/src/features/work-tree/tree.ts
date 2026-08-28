import * as vscode from 'vscode';
import { filterTree, textMatches } from '../tree-filter.ts';
import { TURN_SCHEME_PATH, turnColourIn } from '../turn-colour.ts';
import { type WorkNode, type WorkTree, documentPath } from './harness.ts';

const WORK_SCHEME = 'ops-work';

const OPEN_COMMAND = 'vscode.open';

export interface WorkTreeView {
	readonly provider: vscode.TreeDataProvider<WorkNode>;
	readonly replace: (tree: WorkTree) => undefined;
	readonly filter: (pattern: string) => undefined;
	readonly matchCount: () => number | undefined;
	readonly dispose: () => undefined;
}

export function createWorkTree(): WorkTreeView {
	const emitter = new vscode.EventEmitter<undefined>();
	let tree: WorkTree | undefined;
	let pattern = '';
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
			(node) => textMatches(pattern, node.label, node.detail, node.note),
			(node, children) => ({ ...node, children })
		);
		narrowed = result.roots;
		matched = result.matchCount;
		return undefined;
	};

	const provider: vscode.TreeDataProvider<WorkNode> = {
		onDidChangeTreeData: emitter.event,
		getChildren: (element?: WorkNode) => [
			...(element === undefined ? (narrowed ?? tree?.roots ?? []) : element.children),
		],
		getTreeItem: (element: WorkNode) => buildTreeItem(element, tree, narrowed !== undefined),
	};

	return {
		provider,
		replace: (next: WorkTree) => {
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

function rowId(element: WorkNode): string {
	return element.key;
}

function buildTreeItem(element: WorkNode, tree: WorkTree | undefined, filtering: boolean): vscode.TreeItem {
	const item = new vscode.TreeItem(
		element.label,
		element.children.length === 0
			? vscode.TreeItemCollapsibleState.None
			: filtering
				? vscode.TreeItemCollapsibleState.Expanded
				: vscode.TreeItemCollapsibleState.Collapsed
	);
	item.id = filtering ? `filtered:${rowId(element)}` : rowId(element);
	item.count = element.children.length === 0 ? undefined : element.children.length;
	item.description = element.detail ?? undefined;
	item.iconPath = new vscode.ThemeIcon('blank');
	if (element.colour !== null) {
		item.resourceUri = vscode.Uri.from({
			scheme: WORK_SCHEME,
			path: `/${TURN_SCHEME_PATH}/${element.colour}/${rowId(element)}`,
		});
	}
	item.tooltip = [
		element.label,
		element.detail,
		element.note,
		element.relPath ?? 'a sentinel, standing for what declared nothing — it opens no document',
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
