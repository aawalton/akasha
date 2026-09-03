import {
  ALAN,
  agentPagesIn,
  assembleForest,
  countRunning,
  WORKING,
} from "../agent-forest/agent-forest.module.code.ts"
import {
  type ForestAnswer,
  type HarnessRow,
  parseForest,
  parseStateColor,
} from "../agent-forest-answer/agent-forest-answer.module.code.ts"
import type { AgentNode } from "../agent-row/agent-row.module.code.ts"
import { readSeatPlaces } from "../agent-tree-lookup/agent-tree-lookup.module.code.ts"
import { askHarness } from "../harness-json/harness-json.module.code.ts"
import type {
  SubagentNode,
  SubagentReader,
} from "../subagent-reading/subagent-reading.module.code.ts"
import {
  dropSeatTranscripts,
  seatTranscriptOf,
} from "../transcript-sources/transcript-sources.module.code.ts"

let workingColorHeld: string | undefined | null = null

export function dropSeatAnswers(): void {
  workingColorHeld = null
  dropSeatTranscripts()
}

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

export interface AgentForest {
  readonly roots: readonly AgentNode[]
  readonly alanPrincipalCount: number
  readonly runningCount: number
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
