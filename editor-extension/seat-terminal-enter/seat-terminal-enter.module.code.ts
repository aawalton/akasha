import type * as vscode from "vscode"
import { seatTerminals } from "../agent-tree-state/agent-tree-state.module.code.ts"
import { callHarness } from "../harness-call/harness-call.module.code.ts"

export const FOCUS_KEY = "opsAgentTree.seatTerminalFocused"

export const ENTER_COMMAND = "opsAgentTree.enterInSeatTerminal"

const MESSAGED_MODULE = "seat-messaged"

const MESSAGED_EXPORT = "seatMessaged"

const SUBMIT = "\r"

const MESSAGED_TIMEOUT_MS = 10_000

const SET_CONTEXT = "setContext"

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

export async function enterPressed(
  editor: Editor,
  say: (text: string) => void
): Promise<undefined> {
  const terminal = editor.window.activeTerminal
  if (terminal === undefined) {
    say("[enter] no terminal holds the focus")
    return undefined
  }
  terminal.sendText(SUBMIT, false)
  const name = seatOfTerminal(held(), terminal)
  if (name === undefined) {
    say(`[enter] the focused terminal holds no seat, of ${held().length} that do`)
    return undefined
  }
  try {
    await callHarness(MESSAGED_MODULE, MESSAGED_EXPORT, [name], {
      timeout: MESSAGED_TIMEOUT_MS,
    })
    say(`[enter] ${name} marked`)
  } catch (err) {
    say(`[enter] ${name}: ${String(err)}`)
  }
  return undefined
}

let published: boolean | undefined

export async function publishFocus(
  editor: Editor,
  say: (text: string) => void
): Promise<undefined> {
  const focused = seatOfTerminal(held(), editor.window.activeTerminal) !== undefined
  await editor.commands.executeCommand(SET_CONTEXT, FOCUS_KEY, focused)
  if (focused !== published) {
    published = focused
    say(`[enter] the focused terminal ${focused ? "holds" : "holds no"} seat`)
  }
  return undefined
}

export function activate(
  editor: Editor,
  context: vscode.ExtensionContext,
  say: (text: string) => void
): undefined {
  const republish = (): undefined => {
    void publishFocus(editor, say)
    return undefined
  }
  context.subscriptions.push(
    editor.commands.registerCommand(ENTER_COMMAND, () => enterPressed(editor, say)),
    editor.window.onDidChangeActiveTerminal(republish),
    editor.window.onDidOpenTerminal(republish),
    editor.window.onDidCloseTerminal(republish),
    editor.window.tabGroups.onDidChangeTabs(republish)
  )
  republish()
  return undefined
}
