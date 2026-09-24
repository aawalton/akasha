import type { ColumnMemory } from "akasha/code/editor/extension/modules/column-memory/column-memory.module.code.ts"
import type { SeatTerminal } from "akasha/code/editor/extension/modules/seat-terminals/seat-terminals.module.code.ts"
import type * as vscode from "vscode"
import "akasha/alan/harness/code-editor/data-interface/pages/agent-tree/agent-tree.code-editor-data-interface.d.ts"

export let output: vscode.OutputChannel

export let forest: readonly AgentTreeRow[] = []

export let columns: ColumnMemory

export let seatTerminals: readonly SeatTerminal[] = []

export let seatTabs: ReadonlyMap<number, AgentTreeRow> = new Map()

export function setOutput(next: vscode.OutputChannel): undefined {
  output = next
  return undefined
}

export function setForest(next: readonly AgentTreeRow[]): undefined {
  forest = next
  return undefined
}

export function setColumns(next: ColumnMemory): undefined {
  columns = next
  return undefined
}

export function setSeatTerminals(next: readonly SeatTerminal[]): undefined {
  seatTerminals = next
  return undefined
}

export function setSeatTabs(next: ReadonlyMap<number, AgentTreeRow>): undefined {
  seatTabs = next
  return undefined
}
