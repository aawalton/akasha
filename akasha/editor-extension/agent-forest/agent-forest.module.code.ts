import * as path from "node:path"
import type { ForestAnswer } from "../agent-forest-answer/agent-forest-answer.module.code.ts"
import type { AgentNode } from "../agent-row/agent-row.module.code.ts"
import type { SeatMode } from "../seat-mode/seat-mode.module.code.ts"
import type { SubagentNode } from "../subagent-reading/subagent-reading.module.code.ts"

export const ALAN = "alan"

export const WORKING = "working"

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
}

const APART = "\u0000"

export function subagentKey(seatName: string, own: string): string {
  return `${seatName}${APART}${own}`
}

export function agentPagesIn(answer: ForestAnswer): AgentPages {
  const bySubagent = new Map<string, string>()
  const repo = answer.repo
  if (repo !== null) {
    for (const page of answer.subagentPages) {
      bySubagent.set(subagentKey(page.seat, page.own), path.join(repo, page.at))
    }
  }
  return { bySubagent }
}

export function countRunning(nodes: readonly AgentNode[]): number {
  let total = 0
  for (const node of nodes) {
    if (node.live) {
      total++
    }
    total += countRunning(node.children)
  }
  return total
}

export function countRows(nodes: readonly AgentNode[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

const NO_PAGES: AgentPages = { bySubagent: new Map() }

function holdsSomethingRunning(node: AgentNode): boolean {
  return node.live || node.children.some(holdsSomethingRunning)
}

function sortByName(nodes: readonly AgentNode[]): readonly AgentNode[] {
  return [...nodes].sort((a, b) => a.name.localeCompare(b.name))
}

function toAgentNode(
  node: SubagentNode,
  drawnWorking: string | undefined,
  seatName: string,
  pages: AgentPages
): AgentNode {
  return {
    id: node.key,
    name: node.label,
    kind: "subagent",
    live: true,
    state: WORKING,
    color: drawnWorking,
    at:
      node.agentId === null ? undefined : pages.bySubagent.get(subagentKey(seatName, node.agentId)),
    children: node.children.map((child) => toAgentNode(child, drawnWorking, seatName, pages)),
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
): readonly AgentNode[] {
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

  const build = (row: SeatRow, visited: ReadonlySet<string>): AgentNode => {
    const seen = new Set(visited).add(row.id)
    const seats = (childrenByParent.get(row.id) ?? [])
      .filter((c) => !seen.has(c.id))
      .map((c) => build(c, seen))
      .filter(holdsSomethingRunning)
    const name = row.name ?? row.id
    const subagents = (subagentsBySeat.get(row.id) ?? []).map((one) =>
      toAgentNode(one, drawnWorking, name, pages)
    )
    return {
      id: row.id,
      name,
      kind: "seat",
      live: liveIds.has(row.id),
      place: places.get(row.id) ?? "headless",
      state: row.state ?? undefined,
      waitingOn: row.waitingOn ?? undefined,
      color: row.color ?? undefined,
      at:
        row.at === null || repo === null || repo === undefined
          ? undefined
          : path.join(repo, row.at),
      children: [...sortByName(seats), ...subagents],
    }
  }

  return sortByName(roots.map((r) => build(r, new Set())).filter(holdsSomethingRunning))
}
