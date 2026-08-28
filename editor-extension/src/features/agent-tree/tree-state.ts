import * as vscode from 'vscode';
import { type ColumnMemory, type SeatTerminal } from './columns.ts';
import { type AgentNode } from './forest.ts';

export let output: vscode.OutputChannel;

export let forest: readonly AgentNode[] = [];

export let columns: ColumnMemory;

export let seatTerminals: readonly SeatTerminal[] = [];

export let seatTabs: ReadonlyMap<number, AgentNode> = new Map();

export function setOutput(next: vscode.OutputChannel): undefined {
	output = next;
	return undefined;
}

export function setForest(next: readonly AgentNode[]): undefined {
	forest = next;
	return undefined;
}

export function setColumns(next: ColumnMemory): undefined {
	columns = next;
	return undefined;
}

export function setSeatTerminals(next: readonly SeatTerminal[]): undefined {
	seatTerminals = next;
	return undefined;
}

export function setSeatTabs(next: ReadonlyMap<number, AgentNode>): undefined {
	seatTabs = next;
	return undefined;
}
