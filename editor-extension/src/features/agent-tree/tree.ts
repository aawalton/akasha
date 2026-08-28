import * as vscode from 'vscode';
import { filterTree, textMatches } from '../tree-filter.ts';
import type { AgentNode } from './forest.ts';
import { turnColourIn, turnStateSaid } from '../turn-colour.ts';
import { seatContextValue } from './toggles.ts';

export const REVEAL_TERMINAL_COMMAND = 'opsAgentTree.revealTerminal';

export interface SeatClick {
	readonly id: string;
	readonly name: string;
}

export const AGENT_SCHEME = 'ops-agent';

export interface AgentTree {
	readonly provider: vscode.TreeDataProvider<AgentNode>;
	readonly replace: (roots: readonly AgentNode[]) => undefined;
	readonly filter: (pattern: string) => undefined;
	readonly matchCount: () => number | undefined;
	readonly dispose: () => undefined;
}

export function createAgentTree(): AgentTree {
	const emitter = new vscode.EventEmitter<undefined>();
	let roots: readonly AgentNode[] = [];
	let pattern = '';
	let narrowed: readonly AgentNode[] | undefined;
	let matched: number | undefined;

	const narrow = (): undefined => {
		if (pattern.trim() === '') {
			narrowed = undefined;
			matched = undefined;
			return undefined;
		}
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
		getChildren: (element?: AgentNode) => [...(element === undefined ? (narrowed ?? roots) : element.children)],
		getTreeItem: (element: AgentNode) => buildTreeItem(element, narrowed !== undefined),
	};

	return {
		provider,
		replace: (next: readonly AgentNode[]) => {
			roots = next;
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
	const item = new vscode.TreeItem(
		element.name,
		element.children.length === 0
			? vscode.TreeItemCollapsibleState.None
			: filtering
				? vscode.TreeItemCollapsibleState.Expanded
				: vscode.TreeItemCollapsibleState.Collapsed
	);
	item.id = filtering ? `filtered:${element.id}` : element.id;
	item.count = element.children.length === 0 ? undefined : element.children.length;
	item.iconPath = new vscode.ThemeIcon('blank');
	item.tooltip =
		element.kind === 'subagent'
			? element.name
			: [
				element.name,
				`${element.live ? 'Running' : 'Stopped'}, ${element.place ?? 'headless'}`,
				turnStateSaid(element.state, element.waitingOn),
			].filter((line): line is string => line !== undefined).join('\n');
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
	item.contextValue =
		element.kind === 'subagent'
			? 'subagent'
			: seatContextValue(element.live, element.place ?? 'headless');
	if (element.kind === 'seat') {
		const clicked: SeatClick = { id: element.id, name: element.name };
		item.command = {
			command: REVEAL_TERMINAL_COMMAND,
			title: 'Show what this seat is doing',
			arguments: [clicked],
		};
	}
	return item;
}

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
