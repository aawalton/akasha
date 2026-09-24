import { spawn } from "node:child_process"
import { seatTerminals } from "akasha/code/editor/extension/modules/agent-tree-state/agent-tree-state.module.code.ts"
import {
  endsAList,
  indentLength,
  openedLinePrefix,
} from "akasha/code/editor/extension/modules/opened-line-prefix/opened-line-prefix.module.code.ts"
import {
  type Editor,
  type Held,
  seatOfTerminal,
} from "akasha/code/editor/extension/modules/seat-terminal-enter/seat-terminal-enter.module.code.ts"
import type * as vscode from "vscode"

export const OPEN_LINE_COMMAND = "opsAgentTree.openLineInSeatTerminal"

const GUTTER = 2

const PANE_FORMAT = "#{pane_id} #{cursor_y} #{cursor_x} #{pane_width} #{pane_in_mode}"

const PROMPT_MARKER = "❯"

const WRAP_MARGIN = 4

const FIRST_WORD = /^\S*/

const ITEM_START = /^(?:\d+[.)]|[-*+])(?:\s|$)/

const NOT_IN_MODE = "0"

const TMUX_TIMEOUT_MS = 300

const ESCAPE = String.fromCharCode(27)

const RETURN = "\r"

const ERASE = String.fromCharCode(127)

export function opening(prefix: string): string {
  return `${ESCAPE}${RETURN}${prefix}`
}

export function sentOn(line: string, column: number): string {
  const marked = column - indentLength(line)
  if (endsAList(line) && marked > 0) {
    return ERASE.repeat(marked)
  }
  return opening(openedLinePrefix(line))
}

export function lineIn(row: string): string {
  return row.replace(/\n+$/, "").slice(GUTTER)
}

export function wrapsOnto(above: string, row: string, width: number): boolean {
  if (!above.startsWith(PROMPT_MARKER) && !above.startsWith(" ".repeat(GUTTER))) {
    return false
  }
  if (!row.startsWith(" ".repeat(GUTTER))) {
    return false
  }
  const line = lineIn(row)
  const word = FIRST_WORD.exec(line)?.[0] ?? ""
  if (word === "" || ITEM_START.test(line)) {
    return false
  }
  return above.length + 1 + word.length > width - WRAP_MARGIN
}

export interface PaneAt {
  readonly pane: string
  readonly cursorY: number
  readonly cursorX: number
  readonly width: number
}

export interface CursorLine {
  readonly line: string
  readonly column: number
}

export function cursorLineIn(rows: readonly string[], cursorX: number, width: number): CursorLine {
  let start = rows.length - 1
  while (start > 0 && wrapsOnto(rows[start - 1] ?? "", rows[start] ?? "", width)) {
    start -= 1
  }
  const lines = rows.slice(start).map(lineIn)
  const before = lines
    .slice(0, -1)
    .map((line) => `${line} `)
    .join("")
  const cursorRow = lines[lines.length - 1] ?? ""
  return { line: `${before}${cursorRow}`, column: before.length + Math.max(0, cursorX - GUTTER) }
}

export function paneIn(said: string): PaneAt | null {
  const first = said.split("\n")[0] ?? ""
  const parts = first.trim().split(" ")
  const pane = parts[0] ?? ""
  const cursorY = Number(parts[1] ?? "")
  const cursorX = Number(parts[2] ?? "")
  const width = Number(parts[3] ?? "")
  if (pane === "" || parts[4] !== NOT_IN_MODE) {
    return null
  }
  if (!Number.isInteger(cursorY) || cursorY < 0) {
    return null
  }
  if (!Number.isInteger(cursorX) || cursorX < 0) {
    return null
  }
  if (!Number.isInteger(width) || width <= 0) {
    return null
  }
  return { pane, cursorY, cursorX, width }
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

export async function cursorLineOf(seat: string, ask: AskTmux): Promise<CursorLine | null> {
  const panes = await ask(["list-panes", "-t", `=${seat}`, "-F", PANE_FORMAT])
  if (panes === null) {
    return null
  }
  const at = paneIn(panes)
  if (at === null) {
    return null
  }
  const said = await ask(["capture-pane", "-p", "-t", at.pane, "-S", "0", "-E", String(at.cursorY)])
  if (said === null) {
    return null
  }
  return cursorLineIn(said.replace(/\n$/, "").split("\n"), at.cursorX, at.width)
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
  const at = name === undefined ? null : await cursorLineOf(name, ask)
  if (name !== undefined && at === null) {
    say(`[open-line] ${name}: tmux answered no line, so the line opens carrying nothing`)
  }
  terminal.sendText(at === null ? opening("") : sentOn(at.line, at.column), false)
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
