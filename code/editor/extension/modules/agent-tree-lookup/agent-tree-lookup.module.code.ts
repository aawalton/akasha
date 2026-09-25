import {
  SEAT_MODE_SCHEMA,
  type SeatMode,
} from "akasha/code/editor/extension/modules/seat-mode/seat-mode.module.code.ts"
import "akasha/alan/harness/code-editor/data-interface/pages/agent-tree/agent-tree.code-editor-data-interface.d.ts"

export function readSeatPlaces(rows: readonly HarnessRow[]): ReadonlyMap<string, SeatMode> {
  const places = new Map<string, SeatMode>()
  for (const row of rows) {
    const stated = SEAT_MODE_SCHEMA.safeParse(row.mode)
    places.set(row.id, stated.success ? stated.data : "interactive")
  }
  return places
}

export function seatsByName(roots: readonly AgentTreeRow[]): ReadonlyMap<string, AgentTreeRow> {
  const found = new Map<string, AgentTreeRow>()
  const walk = (nodes: readonly AgentTreeRow[]): undefined => {
    for (const node of nodes) {
      if (node.kind === "seat") {
        found.set(node.label, node)
      }
      walk(node.children)
    }
    return undefined
  }
  walk(roots)
  return found
}

export function ancestorNames(roots: readonly AgentTreeRow[], id: string): readonly string[] {
  const found: string[] = []
  const walk = (node: AgentTreeRow, trail: readonly string[]): boolean => {
    if (node.key === id) {
      found.push(...trail)
      return true
    }
    const below = [node.label, ...trail]
    for (const child of node.children) {
      if (walk(child, below)) {
        return true
      }
    }
    return false
  }
  for (const root of roots) {
    if (walk(root, [])) {
      break
    }
  }
  return found
}

interface HarnessRow {
  readonly id: string
  readonly name: string | null
  readonly parent_agent_id: string | null
  readonly principal: string | null
  readonly launch: string | null
  readonly mode: string | null
  readonly live: boolean
  readonly state: string | null
  readonly waitingOn: string | null
  readonly color: string | null
  readonly at: string | null
}
