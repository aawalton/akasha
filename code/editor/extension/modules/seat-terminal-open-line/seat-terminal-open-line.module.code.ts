import { spawn } from "node:child_process"
import { seatTerminals } from "akasha/code/editor/extension/modules/agent-tree-state/agent-tree-state.module.code.ts"
import { openedLinePrefix } from "akasha/code/editor/extension/modules/opened-line-prefix/opened-line-prefix.module.code.ts"
import {
  type Editor,
  type Held,
  seatOfTerminal,
} from "akasha/code/editor/extension/modules/seat-terminal-enter/seat-terminal-enter.module.code.ts"
import type * as vscode from "vscode"

export const OPEN_LINE_COMMAND = "opsAgentTree.openLineInSeatTerminal"

const GUTTER = 2

const PANE_FORMAT = "#{pane_id} #{cursor_y} #{pane_in_mode}"

const NOT_IN_MODE = "0"

const TMUX_TIMEOUT_MS = 300

const ESCAPE = String.fromCharCode(27)

const RETURN = "\r"

export function opening(prefix: string): string {
  return `${ESCAPE}${RETURN}${prefix}`
}

export function lineIn(row: string): string {
  return row.replace(/\n+$/, "").slice(GUTTER)
}

export interface PaneAt {
  readonly pane: string
  readonly cursorY: number
}

export function paneIn(said: string): PaneAt | null {
  const first = said.split("\n")[0] ?? ""
  const parts = first.trim().split(" ")
  const pane = parts[0] ?? ""
  const cursorY = Number(parts[1] ?? "")
  if (pane === "" || parts[2] !== NOT_IN_MODE) {
    return null
  }
  if (!Number.isInteger(cursorY) || cursorY < 0) {
    return null
  }
  return { pane, cursorY }
}

export type AskTmux = (argv: readonly string[]) => Promise<string | null>

export const askTmux: AskTmux = (argv) =>
  new Promise<string | null>((settle) => {
    const child = spawn("tmux", [...argv], {
      stdio: ["ignore", "pipe", "ignore"],
      timeout: TMUX_TIMEOUT_MS,
    })
    const chunks: string[] = []
    child.stdout?.setEncoding("utf8")
    child.stdout?.on("data", (chunk: string) => {
      chunks.push(chunk)
    })
    child.on("error", () => settle(null))
    child.on("close", (code) => settle(code === 0 ? chunks.join("") : null))
  })

export async function cursorLineOf(seat: string, ask: AskTmux): Promise<string | null> {
  const panes = await ask(["list-panes", "-t", `=${seat}`, "-F", PANE_FORMAT])
  if (panes === null) {
    return null
  }
  const at = paneIn(panes)
  if (at === null) {
    return null
  }
  const row = await ask([
    "capture-pane",
    "-p",
    "-t",
    at.pane,
    "-S",
    String(at.cursorY),
    "-E",
    String(at.cursorY),
  ])
  return row === null ? null : lineIn(row)
}

function held(): readonly Held[] {
  return seatTerminals as readonly Held[]
}

export async function openLinePressed(
  editor: Editor,
  say: (text: string) => void,
  ask: AskTmux = askTmux
): Promise<undefined> {
  const terminal = editor.window.activeTerminal
  if (terminal === undefined) {
    say("[open-line] no terminal holds the focus")
    return undefined
  }
  const name = seatOfTerminal(held(), terminal)
  const line = name === undefined ? null : await cursorLineOf(name, ask)
  if (name !== undefined && line === null) {
    say(`[open-line] ${name}: tmux answered no line, so the line opens carrying nothing`)
  }
  terminal.sendText(opening(line === null ? "" : openedLinePrefix(line)), false)
  return undefined
}

export function activate(
  editor: Editor,
  context: vscode.ExtensionContext,
  say: (text: string) => void
): undefined {
  context.subscriptions.push(
    editor.commands.registerCommand(OPEN_LINE_COMMAND, () => openLinePressed(editor, say))
  )
  return undefined
}
