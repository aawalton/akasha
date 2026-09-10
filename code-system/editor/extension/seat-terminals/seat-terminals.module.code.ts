import * as vscode from "vscode"
import {
  readState,
  stateAt,
} from "../../../../alan/harness/code-editor/data-interfaces/state-reading/state-reading.module.code.ts"
import type { ColumnNumber } from "../editor-group/editor-group.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import {
  identified,
  type PidTally,
  readProcessIds,
  tally,
  tallyLine,
} from "../terminal-pids/terminal-pids.module.code.ts"

const TERMINAL_TABS = "terminal-tabs"

export interface SeatTerminal {
  readonly name: string
  readonly terminal: vscode.Terminal
  readonly column: ColumnNumber | undefined
}

export function groupForTerminal(terminal: vscode.Terminal): ColumnNumber | undefined {
  for (const group of vscode.window.tabGroups.all) {
    for (const tab of group.tabs) {
      const input: unknown = tab.input
      if (!(input instanceof vscode.TabInputTerminal)) {
        continue
      }
      if (input.terminal === terminal) {
        return group.viewColumn
      }
    }
  }
  return undefined
}

export function tabInstanceIds(): ReadonlyMap<vscode.Terminal, number> {
  const found = new Map<vscode.Terminal, number>()
  for (const group of vscode.window.tabGroups.all) {
    for (const tab of group.tabs) {
      const input: unknown = tab.input
      if (!(input instanceof vscode.TabInputTerminal)) {
        continue
      }
      const { terminal, instanceId } = input
      if (terminal === undefined || instanceId === undefined) {
        continue
      }
      found.set(terminal, instanceId)
    }
  }
  return found
}

export function openColumns(): readonly ColumnNumber[] {
  return vscode.window.tabGroups.all.map((group) => group.viewColumn)
}

export async function readSeatTerminals(seatByShellPid: ReadonlyMap<number, string>): Promise<{
  readonly seats: readonly SeatTerminal[]
  readonly sweep: string
  readonly counted: PidTally
  readonly ms: number
  readonly pidByTerminal: ReadonlyMap<vscode.Terminal, number>
}> {
  const began = Date.now()
  const readings = await readProcessIds(vscode.window.terminals)
  const ms = Date.now() - began
  const counted = tally(readings)
  const sweep = tallyLine(counted, ms)
  const found: SeatTerminal[] = []
  const pidByTerminal = new Map<vscode.Terminal, number>()
  for (const { terminal, pid } of identified(readings)) {
    pidByTerminal.set(terminal, pid)
    const name = seatByShellPid.get(pid)
    if (name === undefined) {
      continue
    }
    found.push({ name, terminal, column: groupForTerminal(terminal) })
  }
  return { seats: found, sweep, counted, ms, pidByTerminal }
}

export function readSeatLookup(): ReadonlyMap<number, string> | null {
  const held = readState<TerminalTabsState>(stateAt(akashaRoot(), TERMINAL_TABS))
  if (held === null) {
    return null
  }
  const found = new Map<number, string>()
  for (const [pid, name] of Object.entries(held.seatByShellPid)) {
    const said = Number(pid)
    if (Number.isInteger(said)) {
      found.set(said, name)
    }
  }
  return found
}
