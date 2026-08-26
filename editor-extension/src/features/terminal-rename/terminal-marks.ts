/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * What this feature has put on which terminal, and the label it uses for one that cannot answer.
 *
 * HELD APART FROM BOTH THE SWEEP AND THE ACTIVATION because both reach it. The sweep reads and
 * writes these on every focus change; the terminal-close handler clears an entry as its terminal
 * goes. One owner rather than a copy on each side is what keeps those two from disagreeing about
 * what has been applied.
 */

import type * as vscode from 'vscode';

export const lastAppliedByTerminal = new Map<vscode.Terminal, string>();

/**
 * The colour this feature last put on each terminal.
 *
 * A SECOND MAP RATHER THAN A PAIR IN THE FIRST, because the two are applied on different
 * conditions and cleared on different ones. A terminal that could not report a process is
 * renamed to the silent marker and keeps whatever colour it had; a seat that gained a value
 * after its terminal was named is recoloured without being renamed. Held as one record, each
 * of those becomes a case somebody has to remember to split.
 *
 * IT IS ALSO WHAT KEEPS THE SWEEP QUIET. This runs on every focus change, so an unguarded
 * recolour would be one RPC per glance at another window, and each of them redraws every
 * terminal tab's stylesheet.
 */
export const lastColorByTerminal = new Map<vscode.Terminal, string>();

/**
 * The tab label for a terminal that never said what it is running.
 *
 * A CONSTANT RATHER THAN SOMETHING BUILT FROM `term.name`, which is what makes it
 * safe to apply on a sweep that runs again every time Alan changes focus. Derived
 * from the current name it would compound — the second sweep would read the label
 * it wrote on the first and mark it again.
 *
 * Worded for the tab strip rather than the log. Alan reads this beside seat names
 * like `amy-code-editor-lead`, and what he needs from it is that this is the one
 * that cannot answer, in the width a tab actually gets.
 */
export const SILENT_TERMINAL_NAME = '⚠ no process id';
