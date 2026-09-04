import * as vscode from "vscode"
import type { ColumnNumber } from "../editor-group/editor-group.module.code.ts"
import { seatNamesThatExist } from "../seat-page/seat-page.module.code.ts"
import {
  loadPsRows,
  loadTmuxClients,
  type PsRow,
  seatNameForShellPid,
  type TmuxClient,
} from "../terminal-lookup/terminal-lookup.module.code.ts"
import {
  identified,
  type PidTally,
  readProcessIds,
  tally,
  tallyLine,
} from "../terminal-pids/terminal-pids.module.code.ts"

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

export async function readSeatTerminals(
  seatNames: ReadonlySet<string>,
  psRows: readonly PsRow[],
  tmuxClients: readonly TmuxClient[] = []
): Promise<{
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
    const name = seatNameForShellPid(pid, seatNames, psRows, tmuxClients)
    if (name === undefined) {
      continue
    }
    found.push({ name, terminal, column: groupForTerminal(terminal) })
  }
  return { seats: found, sweep, counted, ms, pidByTerminal }
}

export async function readSeatLookup(): Promise<{
  readonly seatNames: ReadonlySet<string>
  readonly psRows: readonly PsRow[]
  readonly tmuxClients: readonly TmuxClient[]
}> {
  const psRows = await loadPsRows()
  if (psRows.length === 0) {
    return { seatNames: new Set<string>(), psRows, tmuxClients: [] }
  }
  const [seatNames, tmuxClients] = await Promise.all([seatNamesThatExist(), loadTmuxClients()])
  return { seatNames, psRows, tmuxClients }
}
