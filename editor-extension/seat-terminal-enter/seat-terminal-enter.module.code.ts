import * as vscode from "vscode"
import { seatTerminals } from "../agent-tree-state/agent-tree-state.module.code.ts"
import { runCommand } from "../harness-call/harness-call.module.code.ts"
import type { SeatTerminal } from "../seat-terminals/seat-terminals.module.code.ts"

export const FOCUS_KEY = "opsAgentTree.seatTerminalFocused"

export const ENTER_COMMAND = "opsAgentTree.enterInSeatTerminal"

const MESSAGED_COMMAND = "seat-messaged"

const SUBMIT = "\r"

const MESSAGED_TIMEOUT_MS = 10_000

const MAX_BUFFER = 64 * 1024

export interface Held {
  readonly terminal: unknown
  readonly name: string
}

export function seatOfTerminal(seats: readonly Held[], terminal: unknown): string | undefined {
  if (terminal === undefined || terminal === null) {
    return undefined
  }
  for (const one of seats) {
    if (one.terminal === terminal) {
      return one.name
    }
  }
  return undefined
}

// THE KEY GOES THROUGH BEFORE THE MARK IS ASKED FOR. The editor holds the key while this runs, so a
// mark that waits on a command server would hold Alan's own typing behind it, and a mark that throws
// would swallow the keystroke rather than the mark.
export async function enterPressed(say: (text: string) => void): Promise<undefined> {
  const terminal = vscode.window.activeTerminal
  if (terminal === undefined) {
    return undefined
  }
  terminal.sendText(SUBMIT, false)
  const name = seatOfTerminal(seatTerminals as readonly SeatTerminal[] as readonly Held[], terminal)
  if (name === undefined) {
    return undefined
  }
  try {
    await runCommand(MESSAGED_COMMAND, [name], {
      timeout: MESSAGED_TIMEOUT_MS,
      maxBuffer: MAX_BUFFER,
    })
  } catch (err) {
    say(`[messaged] ${name}: ${String(err)}`)
  }
  return undefined
}

export async function publishFocus(): Promise<undefined> {
  const held =
    seatOfTerminal(
      seatTerminals as readonly SeatTerminal[] as readonly Held[],
      vscode.window.activeTerminal
    ) !== undefined
  await vscode.commands.executeCommand("setContext", FOCUS_KEY, held)
  return undefined
}

export function activate(context: vscode.ExtensionContext, say: (text: string) => void): undefined {
  context.subscriptions.push(
    vscode.commands.registerCommand(ENTER_COMMAND, () => enterPressed(say)),
    vscode.window.onDidChangeActiveTerminal(() => {
      void publishFocus()
    })
  )
  void publishFocus()
  return undefined
}
