import * as vscode from 'vscode';
import { filterTree, textMatches } from '../tree-filter.ts';
import type { AgentNode } from './forest.ts';
import { turnColorIn, turnStateSaid } from '../turn-color.ts';
import { seatContextValue } from './toggles.ts';

export const REVEAL_TERMINAL_COMMAND = 'opsAgentTree.revealTerminal';

const OPEN_COMMAND = 'vscode.open';

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
	// THE LAST LINE OF A TOOLTIP IS THE PAGE AKASHA HOLDS FOR THE ROW, and it is there only where
	// the page is. `forest.ts` carries a path onto a row only after the command opened that file while
	// composing its answer, so a tooltip naming a page is a tooltip naming one that was standing.
	// A row akasha holds no page for says so rather than leaving the reader to guess whether the
	// panel lost the path or the page was never there — the two look identical as a missing line.
	item.tooltip = (element.kind === 'subagent'
		? [element.name, element.at ?? 'akasha holds no page for this subagent']
		: [
			element.name,
			`${element.live ? 'Running' : 'Stopped'}, ${element.place ?? 'headless'}`,
			turnStateSaid(element.state, element.waitingOn),
			element.at ?? 'akasha holds no page for this seat',
		]
	).filter((line): line is string => line !== undefined).join('\n');
	if (element.kind === 'subagent') {
		item.resourceUri = vscode.Uri.from({
			scheme: AGENT_SCHEME,
			path:
				element.color === undefined
					? `/subagent/${element.id}`
					: `/subagent/${element.color}/${element.id}`,
		});
	} else if (!element.live) {
		item.resourceUri = vscode.Uri.from({ scheme: AGENT_SCHEME, path: `/stopped/${element.id}` });
	} else if (element.color !== undefined) {
		item.resourceUri = vscode.Uri.from({
			scheme: AGENT_SCHEME,
			path: `/turn/${element.color}/${element.id}`,
		});
	}
	item.contextValue =
		element.kind === 'subagent'
			? 'subagent'
			: seatContextValue(element.live, element.place ?? 'headless');
	// WHAT A CLICK DOES IS NOT THE SAME ON BOTH KINDS OF ROW, and the difference is what each row
	// already had. A seat's click brings the terminal it is working in forward, which is the whole
	// reason the panel is looked at while a fleet is running, and it is reachable nowhere else —
	// `opsAgentTree.revealTerminal` is contributed to no menu. Its page is offered beside it
	// through `opsAgentTree.openPage` rather than in place of it. A subagent's row had no click at
	// all, so its page takes it.
	if (element.kind === 'seat') {
		const clicked: SeatClick = { id: element.id, name: element.name };
		item.command = {
			command: REVEAL_TERMINAL_COMMAND,
			title: 'Show what this seat is doing',
			arguments: [clicked],
		};
	} else if (element.at !== undefined) {
		item.command = {
			command: OPEN_COMMAND,
			title: 'Open this document',
			arguments: [vscode.Uri.file(element.at), { preview: true }],
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
			const turn = turnColorIn(uri.path);
			return new vscode.FileDecoration(
				undefined,
				badge,
				turn === undefined ? undefined : new vscode.ThemeColor(turn)
			);
		},
	};
}
