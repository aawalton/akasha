import { join } from "node:path"
import type { SubagentPage } from "akasha/agent/modules/page-reading/agent-page-reading.module.code.ts"
import type { ForestSeat } from "akasha/agent/seat/fleet/modules/seat-forest-reading/seat-forest-reading.module.code.ts"
import {
  forestOver,
  NOW,
} from "akasha/agent/seat/fleet/modules/seat-forest-reading/seat-forest-reading.module.code.ts"
import { colorOfState } from "akasha/agent/seat/observation/seat-turn/modules/color/seat-turn-color.module.code.ts"
import {
  assembleServiceTree,
  type ServiceNode,
} from "akasha/alan/harness/code-editor/data-interface/modules/service-tree-assemble/service-tree-assemble.module.code.ts"
import { wholePath } from "akasha/alan/harness/code-editor/data-interface/modules/state-drawing/state-drawing.module.code.ts"
import {
  type Node,
  treeIn,
} from "akasha/alan/harness/code-editor/data-interface/modules/work-tree-composing/work-tree-composing.module.code.ts"
import {
  ALAN,
  assembleForest,
  countRunning,
  subagentKey,
} from "akasha/code/editor/extension/modules/agent-forest/agent-forest.module.code.ts"
import { readSeatPlaces } from "akasha/code/editor/extension/modules/agent-tree-lookup/agent-tree-lookup.module.code.ts"
import type { SubagentNode } from "akasha/code/editor/extension/modules/subagent-reading/subagent-reading.module.code.ts"
import "akasha/alan/harness/code-editor/data-interface/pages/agent-tree/agent-tree.code-editor-data-interface.d.ts"
import "akasha/alan/harness/code-editor/data-interface/pages/service-tree/service-tree.code-editor-data-interface.d.ts"
import "akasha/alan/harness/code-editor/data-interface/pages/work-tree/work-tree.code-editor-data-interface.d.ts"

function workRow(root: string, node: Node): WorkTreeRow {
  return {
    kind: node.kind,
    key: node.key,
    label: node.label,
    at: wholePath(root, node.relPath),
    color: node.color,
    detail: node.detail,
    note: node.note,
    children: node.children.map((child) => workRow(root, child)),
  }
}

export function workTreeLine(root: string): string {
  const under = treeIn(root).map((node) => workRow(root, node))
  const roots: readonly WorkTreeRow[] = [
    {
      kind: "root",
      key: "root",
      label: "work",
      at: null,
      color: null,
      detail: null,
      note: null,
      children: under,
    },
  ]
  return JSON.stringify({ roots } satisfies WorkTreeState)
}

type AgentNodeIn = {
  readonly id: string
  readonly name: string
  readonly kind: string
  readonly place?: string
  readonly live: boolean
  readonly state?: string
  readonly waitingOn?: string
  readonly color?: string
  readonly at?: string
  readonly stopped?: boolean
  readonly children: readonly AgentNodeIn[]
}

function agentRow(node: AgentNodeIn): AgentTreeRow {
  return {
    key: node.id,
    label: node.name,
    at: node.at ?? null,
    color: node.color ?? null,
    kind: node.kind === "subagent" ? "subagent" : "seat",
    live: node.live,
    stopped: node.stopped === true,
    place: node.place === "interactive" || node.place === "headless" ? node.place : null,
    state: node.state ?? null,
    waitingOn: node.waitingOn ?? null,
    children: node.children.map(agentRow),
  }
}

function subagentsBySeat(
  pages: readonly SubagentPage[],
  rows: readonly ForestSeat[]
): ReadonlyMap<string, readonly SubagentNode[]> {
  const idByName = new Map<string, string>()
  for (const row of rows) if (row.name !== null) idByName.set(row.name, row.id)
  const bySeat = new Map<string, SubagentNode[]>()
  for (const page of pages) {
    const seatId = idByName.get(page.seat)
    if (seatId === undefined) continue
    const held = bySeat.get(seatId) ?? []
    held.push({
      key: page.own,
      label: page.dispatchedAs ?? page.own,
      agentId: page.own,
      children: [],
    })
    bySeat.set(seatId, held)
  }
  return bySeat
}

export function agentTreeLine(root: string): string {
  const answer = forestOver(root, NOW)
  const rows = answer.rows
  const bySubagent = new Map<string, string>()
  const stopped = new Set<string>()
  for (const page of answer.subagents) {
    const key = subagentKey(page.seat, page.own)
    bySubagent.set(key, join(root, page.at))
    if (page.stopped === true) stopped.add(key)
  }
  const under = assembleForest(
    rows,
    new Set(rows.filter((row) => row.live).map((row) => row.id)),
    subagentsBySeat(answer.subagents, rows),
    readSeatPlaces(rows),
    colorOfState("working") ?? undefined,
    root,
    { bySubagent, stopped }
  )
  const roots: readonly AgentTreeRow[] = [
    {
      kind: "root",
      key: "root",
      label: "agents",
      at: null,
      color: null,
      live: false,
      stopped: false,
      place: null,
      state: null,
      waitingOn: null,
      children: under.map((node) => agentRow(node as AgentNodeIn)),
    },
  ]
  return JSON.stringify({
    roots,
    alanPrincipalCount: rows.filter((row) => row.principal === ALAN).length,
    runningCount: countRunning(under),
    unreadSeats: 0,
  } satisfies AgentTreeState)
}

function serviceRow(root: string, node: ServiceNode): ServiceTreeRow {
  return {
    key: node.key,
    label: node.label,
    at: wholePath(root, node.at),
    color: node.color,
    kind: node.kind,
    detail: node.detail,
    children: node.children.map((child) => serviceRow(root, child)),
  }
}

export function serviceTreeLine(root: string): string {
  const under = assembleServiceTree(root).map((node) => serviceRow(root, node))
  const roots: readonly ServiceTreeRow[] = [
    {
      kind: "root",
      key: "root",
      label: "services",
      at: null,
      color: null,
      detail: null,
      children: under,
    },
  ]
  return JSON.stringify({ roots } satisfies ServiceTreeState)
}
