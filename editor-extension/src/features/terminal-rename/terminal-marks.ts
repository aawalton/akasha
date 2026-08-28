import type * as vscode from 'vscode';

export const lastAppliedByTerminal = new Map<vscode.Terminal, string>();

export const lastColorByTerminal = new Map<vscode.Terminal, string>();

export const SILENT_TERMINAL_NAME = '⚠ no process id';
