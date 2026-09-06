import * as vscode from "vscode"
import {
  readState,
  stateAt,
} from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import type { ColumnNumber } from "../editor-group/editor-group.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import {
  identified,
  type PidTally,
  readProcessIds,
  tally,
  tallyLine,
} from "../terminal-pids/terminal-pids.module.code.ts"

// WHICH SEAT A SHELL IS WORKING IN IS READ OFF THE FILE THE SERVICE ALREADY WRITES.
//
// This asked `ps` for the whole process table and `tmux` for its clients, then walked the parent
// chain from each client up to the shell above it. A shell attaching to a seat now leaves a mark
// naming that seat, and the service folds those marks into the terminal tabs file. The two routes
// were measured against one another on this workstation and agreed on every pair, so reading the
// file costs two forks and 849 process rows less on the extension host's thread at each drawing.

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

// A FILE THAT COULD NOT BE READ IS TOLD APART FROM A FILE NAMING NO SEAT. The first leaves the
// caller with what it sampled last, and the second is the answer that no terminal here holds a
// seat, which is a sample worth recording.
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
