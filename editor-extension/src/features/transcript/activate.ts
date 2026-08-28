/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * The command that opens a transcript.
 *
 * WHERE IT LANDS IS NOT DECIDED HERE. The caller passes the column, and the
 * default is the active one — the choice of editor group belongs to whatever
 * opens this, which is a separate piece of work. This side only renders.
 */
import * as fs from 'node:fs';
import * as vscode from 'vscode';
import { openTranscriptPanel, type TranscriptTarget } from './panel.ts';
import { readSeatTranscripts } from './sources.ts';

export interface OpenTranscriptArgs extends TranscriptTarget {
	readonly viewColumn?: vscode.ViewColumn;
}

/**
 * Seats with a transcript to show, newest first.
 *
 * Read from the seat pages rather than from the agent rows, because a page
 * stating a transcript IS the evidence that there is something to render — a
 * row can name a seat whose session never started.
 */
function seatsWithTranscripts(): readonly { agentId: string; seatName: string; mtimeMs: number }[] {
	const found: { agentId: string; seatName: string; mtimeMs: number }[] = [];
	for (const seat of readSeatTranscripts()) {
		try {
			found.push({ agentId: seat.agentId, seatName: seat.seatName, mtimeMs: fs.statSync(seat.transcriptPath).mtimeMs });
		} catch {
			// The page states a path nothing stands at yet, which is a seat with
			// nothing to show rather than an error.
		}
	}
	return found.sort((a, b) => b.mtimeMs - a.mtimeMs);
}

async function pickSeat(): Promise<{ agentId: string; seatName: string } | undefined> {
	const seats = seatsWithTranscripts();
	if (seats.length === 0) {
		void vscode.window.showInformationMessage('No seat has a session transcript on this machine.');
		return undefined;
	}

	const items = seats.map((seat) => ({
		label: seat.seatName,
		description: seat.agentId.slice(0, 8),
		detail: new Date(seat.mtimeMs).toLocaleString(),
		agentId: seat.agentId,
		seatName: seat.seatName,
	}));

	const chosen = await vscode.window.showQuickPick(items, {
		title: 'Seat transcript',
		placeHolder: 'Which seat\'s session do you want to read?',
	});
	return chosen === undefined ? undefined : { agentId: chosen.agentId, seatName: chosen.seatName };
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'opsTranscript.open',
			async (args?: OpenTranscriptArgs): Promise<void> => {
				let target: TranscriptTarget | undefined = args;

				if (target?.agentId === undefined && target?.transcriptPath === undefined) {
					const picked = await pickSeat();
					if (picked === undefined) { return; }
					target = { agentId: picked.agentId, title: `Transcript — ${picked.seatName}` };
				}

				openTranscriptPanel(context, target, args?.viewColumn);
			}
		)
	);
}
