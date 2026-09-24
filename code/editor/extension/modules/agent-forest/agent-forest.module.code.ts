import * as path from "node:path"
import type { SeatMode } from "akasha/code/editor/extension/modules/seat-mode/seat-mode.module.code.ts"
import type { SubagentNode } from "akasha/code/editor/extension/modules/subagent-reading/subagent-reading.module.code.ts"
import "akasha/alan/harness/code-editor/data-interface/pages/agent-tree/agent-tree.code-editor-data-interface.d.ts"

export const ALAN = "alan"

const WORKING = "working"

export interface SeatRow {
  readonly id: string
  readonly name: string | null
  readonly parent_agent_id: string | null
  readonly principal: string | null
  readonly state: string | null
  readonly waitingOn: string | null
  readonly color: string | null
  readonly at: string | null
}

export interface AgentPages {
  readonly bySubagent: ReadonlyMap<string, string>
  readonly stopped?: ReadonlySet<string>
}

const APART = "\u0000"

export function subagentKey(seatName: string, own: string): string {
  return `${seatName}${APART}${own}`
}

export function countRunning(nodes: readonly AgentTreeRow[]): number {
  let total = 0
  for (const node of nodes) {
    if (node.live) {
      total++
    }
    total += countRunning(node.children)
  }
  return total
}

export function countRows(nodes: readonly AgentTreeRow[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

const NO_PAGES: AgentPages = { bySubagent: new Map() }

function holdsSomethingRunning(node: AgentTreeRow): boolean {
  return node.live || node.children.some(holdsSomethingRunning)
}

function sortByName(nodes: readonly AgentTreeRow[]): readonly AgentTreeRow[] {
  return [...nodes].sort((a, b) => a.label.localeCompare(b.label))
}

function subagentRow(
  node: SubagentNode,
  drawnWorking: string | undefined,
  seatName: string,
  pages: AgentPages
): AgentTreeRow {
  const key = node.agentId === null ? null : subagentKey(seatName, node.agentId)
  return {
    key: node.key,
    label: node.label,
    at: key === null ? null : (pages.bySubagent.get(key) ?? null),
    color: drawnWorking ?? null,
    kind: "subagent",
    live: true,
    stopped: key !== null && pages.stopped?.has(key) === true,
    place: null,
    state: WORKING,
    waitingOn: null,
    children: node.children.map((child) => subagentRow(child, drawnWorking, seatName, pages)),
  }
}

export function assembleForest(
  rows: readonly SeatRow[],
  liveIds: ReadonlySet<string>,
  subagentsBySeat: ReadonlyMap<string, readonly SubagentNode[]>,
  places: ReadonlyMap<string, SeatMode>,
  drawnWorking?: string,
  repo?: string | null,
  pages: AgentPages = NO_PAGES
): readonly AgentTreeRow[] {
  const present = new Set(rows.map((r) => r.id))
  const childrenByParent = new Map<string, SeatRow[]>()
  const roots: SeatRow[] = []
  for (const row of rows) {
    const parent = row.parent_agent_id
    if (row.principal !== ALAN && parent !== null && parent !== row.id && present.has(parent)) {
      const siblings = childrenByParent.get(parent)
      if (siblings === undefined) {
        childrenByParent.set(parent, [row])
      } else {
        siblings.push(row)
      }
    } else {
      roots.push(row)
    }
  }

  const build = (row: SeatRow, visited: ReadonlySet<string>): AgentTreeRow => {
    const seen = new Set(visited).add(row.id)
    const seats = (childrenByParent.get(row.id) ?? [])
      .filter((c) => !seen.has(c.id))
      .map((c) => build(c, seen))
      .filter(holdsSomethingRunning)
    const name = row.name ?? row.id
    const subagents = (subagentsBySeat.get(row.id) ?? []).map((one) =>
      subagentRow(one, drawnWorking, name, pages)
    )
    return {
      key: row.id,
      label: name,
      at: row.at === null || repo === null || repo === undefined ? null : path.join(repo, row.at),
      color: row.color,
      kind: "seat",
      live: liveIds.has(row.id),
      stopped: false,
      place: places.get(row.id) ?? "headless",
      state: row.state,
      waitingOn: row.waitingOn,
      children: [...sortByName(seats), ...subagents],
    }
  }

  return sortByName(roots.map((r) => build(r, new Set())).filter(holdsSomethingRunning))
}
