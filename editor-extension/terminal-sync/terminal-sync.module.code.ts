import type * as vscode from "vscode"
import { shellNameOf } from "../shell-naming/shell-naming.module.code.ts"
import {
  lastAppliedByTerminal,
  lastColorByTerminal,
  SILENT_TERMINAL_NAME,
} from "../terminal-marks/terminal-marks.module.code.ts"
import {
  describeTerminal,
  type PidReading,
  PROCESS_ID_TIMEOUT_MS,
} from "../terminal-pids/terminal-pids.module.code.ts"

export function syncColor(
  term: vscode.Terminal,
  color: string | undefined,
  shellPid: number,
  trigger: string,
  output: vscode.OutputChannel
): void {
  if (color === undefined) {
    if (!lastColorByTerminal.has(term)) {
      return
    }
    lastColorByTerminal.delete(term)
    term.recolor(undefined)
    output.appendLine(`[${trigger}] terminal shell=${shellPid} → color cleared`)
    return
  }
  if (lastColorByTerminal.get(term) === color) {
    return
  }
  term.recolor(color)
  lastColorByTerminal.set(term, color)
  output.appendLine(`[${trigger}] terminal shell=${shellPid} → color ${color}`)
}

export async function syncTerminal(
  reading: PidReading<vscode.Terminal>,
  name: string | undefined,
  index: number,
  of: number,
  color: string | undefined,
  trigger: string,
  output: vscode.OutputChannel
): Promise<void> {
  const term = reading.terminal
  if (reading.outcome === "no process") {
    return
  }
  if (reading.outcome === "never answered") {
    output.appendLine(
      `[${trigger}] terminal did not report a process within ` +
        `${PROCESS_ID_TIMEOUT_MS}ms — tab marked: ` +
        describeTerminal(term, index, of)
    )
    if (lastAppliedByTerminal.get(term) !== SILENT_TERMINAL_NAME) {
      term.rename(SILENT_TERMINAL_NAME)
      lastAppliedByTerminal.set(term, SILENT_TERMINAL_NAME)
    }
    return
  }
  const shellPid = reading.pid
  syncColor(term, color, shellPid, trigger, output)
  if (name === undefined) {
    if (!lastAppliedByTerminal.has(term)) {
      return
    }
    const wasMarkedSilent = lastAppliedByTerminal.get(term) === SILENT_TERMINAL_NAME
    const reason = wasMarkedSilent ? "answered at last" : "seat gone"
    const shellComm = shellNameOf(shellPid)
    lastAppliedByTerminal.delete(term)
    if (shellComm === "") {
      output.appendLine(
        `[${trigger}] terminal shell=${shellPid} → reset skipped (no process under that pid)`
      )
      return
    }
    term.rename(shellComm)
    output.appendLine(
      `[${trigger}] terminal shell=${shellPid} → reset to "${shellComm}" (${reason})`
    )
    return
  }
  if (lastAppliedByTerminal.get(term) === name) {
    return
  }
  term.rename(name)
  lastAppliedByTerminal.set(term, name)
  output.appendLine(`[${trigger}] terminal shell=${shellPid} → "${name}"`)
}
