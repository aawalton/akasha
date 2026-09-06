import type * as vscode from "vscode"
import { seatTerminals } from "../agent-tree-state/agent-tree-state.module.code.ts"
import { runCommand } from "../harness-call/harness-call.module.code.ts"

export const FOCUS_KEY = "opsAgentTree.seatTerminalFocused"

export const ENTER_COMMAND = "opsAgentTree.enterInSeatTerminal"

const MESSAGED_COMMAND = "seat-messaged"

const SUBMIT = "\r"

const MESSAGED_TIMEOUT_MS = 10_000

const MAX_BUFFER = 64 * 1024

const SET_CONTEXT = "setContext"

// THE EDITOR IS HANDED IN RATHER THAN IMPORTED. A test runs outside the editor, where importing
// `vscode` throws before a line of this is read, and the decision this file makes is worth proving.
export type Editor = typeof import("vscode")

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

function held(): readonly Held[] {
  return seatTerminals as readonly Held[]
}

// THE KEY GOES THROUGH BEFORE THE MARK IS ASKED FOR. The editor holds the key while this runs, so a
// mark waiting on a command server would hold Alan's own typing behind it, and a mark that throws
// would swallow the keystroke rather than the mark.
export async function enterPressed(
  editor: Editor,
  say: (text: string) => void
): Promise<undefined> {
  const terminal = editor.window.activeTerminal
  if (terminal === undefined) {
    return undefined
  }
  terminal.sendText(SUBMIT, false)
  const name = seatOfTerminal(held(), terminal)
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

export async function publishFocus(editor: Editor): Promise<undefined> {
  const focused = seatOfTerminal(held(), editor.window.activeTerminal) !== undefined
  await editor.commands.executeCommand(SET_CONTEXT, FOCUS_KEY, focused)
  return undefined
}

export function activate(
  editor: Editor,
  context: vscode.ExtensionContext,
  say: (text: string) => void
): undefined {
  context.subscriptions.push(
    editor.commands.registerCommand(ENTER_COMMAND, () => enterPressed(editor, say)),
    editor.window.onDidChangeActiveTerminal(() => {
      void publishFocus(editor)
    })
  )
  void publishFocus(editor)
  return undefined
}
