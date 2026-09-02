import * as vscode from 'vscode';
import { z } from 'zod';
import { output } from './tree-state.ts';

const OPEN_COMMAND = 'vscode.open';

// A row hands itself to a menu command whole, so what is taken from it is stated rather than cast:
// anything else invoking this by name reaches the same check. `at` is the absolute path the row
// was drawn carrying, which `forest.ts` put there only for a page the verb had opened.
const PAGE_ROW_SCHEMA = z.looseObject({
	name: z.string().min(1),
	at: z.string().min(1),
});

export interface PageRow {
	readonly name: string;
	readonly at: string;
}

export function pageRowIn(invoked: unknown): PageRow | undefined {
	const parsed = PAGE_ROW_SCHEMA.safeParse(invoked);
	return parsed.success ? { name: parsed.data.name, at: parsed.data.at } : undefined;
}

// OPENING NOTHING IS AN ANSWER AND IS SAID AS ONE. The menu this hangs from cannot be narrowed to
// rows that carry a page — a row's `contextValue` is what a `when` clause can read, and the three
// clauses already reading it are anchored on the whole string — so this is offered on every row in
// the panel and refuses the ones with no page. What it must never do is compose a path for a row
// that carries none and open whatever is filed there.
export async function openAgentPage(invoked: unknown): Promise<undefined> {
	const row = pageRowIn(invoked);
	if (row === undefined) {
		void vscode.window.showInformationMessage('akasha holds no page for that row.');
		output.appendLine('[open-page] the row carries no page, so nothing was opened');
		return undefined;
	}
	await vscode.commands.executeCommand(OPEN_COMMAND, vscode.Uri.file(row.at), { preview: true });
	output.appendLine(`[open-page] ${row.name}: ${row.at}`);
	return undefined;
}
