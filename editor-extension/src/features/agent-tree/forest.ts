import * as path from "node:path"
import type { SeatMode } from "../../seat/mode.ts"
import { dropSeatTranscripts, seatTranscriptOf } from "../transcript/sources.ts"
import type { AgentNode } from "./forest-types.ts"
import {
  askHarness,
  type ForestAnswer,
  type HarnessRow,
  parseForest,
  parseStateColor,
} from "./harness.ts"
import { readSeatPlaces } from "./lookup.ts"
import type { SubagentNode, SubagentReader } from "./subagents.ts"

// Still named from here for every consumer that already reads it from here.
export type { AgentKind, AgentNode } from "./forest-types.ts"

const ALAN = "alan"

let workingColorHeld: string | undefined | null = null

export function dropSeatAnswers(): void {
  workingColorHeld = null
  dropSeatTranscripts()
}

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

// WHERE THE PAGES ARE, JOINED TO THE ROWS THAT ARE DRAWN.
//
// A seat's page comes down with its own row, because the command reading the seat is the one that
// found it. A subagent's cannot: which subagents are running is folded out of each seat's
// transcript here, and which have a page is answered by akasha's index there, so the two are
// brought together on the pair a subagent page is keyed by — the seat that ran it and the id it
// runs under.
export interface AgentPages {
  readonly bySubagent: ReadonlyMap<string, string>
}

// The seat name and the id part cannot both be read out of one joined string unambiguously — a
// seat name may hold the parting character and an id may begin with it — so they are held apart
// by a byte neither can carry rather than by a hyphen either of them may.
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

export interface AgentForest {
  readonly roots: readonly AgentNode[]
  readonly alanPrincipalCount: number
  readonly runningCount: number
  // Live seats whose subagents could not be read at all — no transcript was named for the seat, or
  // the fold threw. Their own row still draws; every subagent row under them is missing. Nothing
  // else in the reading says so, and a fleet that is small and a read that was dropped draw the
  // same short tree, so the count is carried out rather than swallowed here.
  readonly unreadSeats: number
  readonly unreadSaid: string | undefined
}

export async function readAgentForest(subagents: SubagentReader): Promise<AgentForest> {
  const answer: ForestAnswer = parseForest(await askHarness("agent-forest"))
  const rows: readonly HarnessRow[] = answer.rows
  const liveIds = new Set(rows.filter((row) => row.live).map((row) => row.id))

  const running = new Map<string, readonly SubagentNode[]>()
  const unread: string[] = []
  await Promise.all(
    [...liveIds].map(async (id) => {
      const stated = await seatTranscriptOf(id)
      if (stated === null) {
        unread.push(`${id}: seat-transcripts named no transcript for it`)
        return
      }
      try {
        running.set(id, await subagents.forSeat(id, stated.transcriptPath))
      } catch (err) {
        unread.push(`${id}: ${err instanceof Error ? err.message : String(err)}`)
      }
    })
  )
  await subagents.dropUntouched()

  let alanPrincipalCount = 0
  for (const row of rows) {
    if (row.principal === ALAN) {
      alanPrincipalCount++
    }
  }

  const places = readSeatPlaces(rows)
  const roots = assembleForest(
    rows,
    liveIds,
    running,
    places,
    await workingColor(),
    answer.repo,
    agentPagesIn(answer)
  )
  return {
    roots,
    alanPrincipalCount,
    runningCount: countRunning(roots),
    unreadSeats: unread.length,
    unreadSaid: unread.sort()[0],
  }
}

const WORKING = "working"

async function workingColor(): Promise<string | undefined> {
  if (workingColorHeld === null) {
    try {
      const answered = await askHarness("agent-turn-colors", ["--state", WORKING])
      workingColorHeld = parseStateColor(answered, WORKING)
    } catch {
      workingColorHeld = undefined
    }
  }
  return workingColorHeld
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

const NO_PAGES: AgentPages = { bySubagent: new Map() }

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
    // Every subagent under a seat is keyed by that seat's NAME, at whatever depth it sits. A
    // subagent's page is named for the seat that ran it, and the seat that ran a subagent's
    // subagent is still that seat: the agent id at every depth is the seat's id and the id the
    // agent runs under, parted by two hyphens, with nothing in between for a middle generation.
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
      // Joined here rather than at the command, because the command answers one
      // repository-relative path per row and the editor opens absolute ones. A row whose command
      // named no page, or an answer that named no repository to join against, carries nothing.
      at:
        row.at === null || repo === null || repo === undefined
          ? undefined
          : path.join(repo, row.at),
      children: [...sortByName(seats), ...subagents],
    }
  }

  return sortByName(roots.map((r) => build(r, new Set())).filter(holdsSomethingRunning))
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
    // A subagent whose dispatching call has not yet named the id it runs under cannot be keyed to
    // a page, and akasha holds no page for one that has already returned. Both read undefined.
    at: node.agentId === null ? undefined : pages.bySubagent.get(subagentKey(seatName, node.agentId)),
    children: node.children.map((child) => toAgentNode(child, drawnWorking, seatName, pages)),
  }
}

function holdsSomethingRunning(node: AgentNode): boolean {
  return node.live || node.children.some(holdsSomethingRunning)
}

function sortByName(nodes: readonly AgentNode[]): readonly AgentNode[] {
  return [...nodes].sort((a, b) => a.name.localeCompare(b.name))
}
