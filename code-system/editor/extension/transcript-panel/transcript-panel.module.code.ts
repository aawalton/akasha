import * as fs from "node:fs"
import * as vscode from "vscode"
import { readSeatTranscripts } from "../transcript-sources/transcript-sources.module.code.ts"
import {
  openTranscriptPanel,
  type TranscriptTarget,
} from "../transcript-view/transcript-view.module.code.ts"

export interface OpenTranscriptArgs extends TranscriptTarget {
  readonly viewColumn?: vscode.ViewColumn
}

async function seatsWithTranscripts(): Promise<
  readonly { agentId: string; seatName: string; mtimeMs: number }[]
> {
  const found: { agentId: string; seatName: string; mtimeMs: number }[] = []
  for (const seat of await readSeatTranscripts()) {
    try {
      found.push({
        agentId: seat.agentId,
        seatName: seat.seatName,
        mtimeMs: fs.statSync(seat.transcriptPath).mtimeMs,
      })
    } catch {}
  }
  return found.sort((a, b) => b.mtimeMs - a.mtimeMs)
}

async function pickSeat(): Promise<{ agentId: string; seatName: string } | undefined> {
  const seats = await seatsWithTranscripts()
  if (seats.length === 0) {
    void vscode.window.showInformationMessage("No seat has a session transcript on this machine.")
    return undefined
  }

  const items = seats.map((seat) => ({
    label: seat.seatName,
    description: seat.agentId.slice(0, 8),
    detail: new Date(seat.mtimeMs).toLocaleString(),
    agentId: seat.agentId,
    seatName: seat.seatName,
  }))

  const chosen = await vscode.window.showQuickPick(items, {
    title: "Seat transcript",
    placeHolder: "Which seat's session do you want to read?",
  })
  return chosen === undefined ? undefined : { agentId: chosen.agentId, seatName: chosen.seatName }
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "opsTranscript.open",
      async (args?: OpenTranscriptArgs): Promise<void> => {
        let target: TranscriptTarget | undefined = args

        if (target?.agentId === undefined && target?.transcriptPath === undefined) {
          const picked = await pickSeat()
          if (picked === undefined) {
            return
          }
          target = { agentId: picked.agentId, title: `Transcript — ${picked.seatName}` }
        }

        openTranscriptPanel(context, target, args?.viewColumn)
      }
    )
  )
}
