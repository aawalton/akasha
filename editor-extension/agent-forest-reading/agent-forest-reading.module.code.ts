import {
  ALAN,
  agentPagesIn,
  assembleForest,
  countRunning,
} from "../agent-forest/agent-forest.module.code.ts"
import {
  type ForestAnswer,
  type HarnessRow,
  parseForest,
} from "../agent-forest-answer/agent-forest-answer.module.code.ts"
import type { AgentNode } from "../agent-row/agent-row.module.code.ts"
import { readSeatPlaces } from "../agent-tree-lookup/agent-tree-lookup.module.code.ts"
import { askHarness } from "../harness-json/harness-json.module.code.ts"
import type {
  SubagentNode,
  SubagentReader,
} from "../subagent-reading/subagent-reading.module.code.ts"
import { seatTranscriptOf } from "../transcript-sources/transcript-sources.module.code.ts"

export interface AgentForest {
  readonly roots: readonly AgentNode[]
  readonly alanPrincipalCount: number
  readonly runningCount: number
  readonly unreadSeats: number
  readonly unreadSaid: string | undefined
}

// THE WORKING TURN'S COLOR IS GIVEN RATHER THAN READ HERE. This runs in the editor's host, which
// holds no transpiler and so cannot open the page stating that color; asking a command for it cost
// a child process, which is why the answer used to be held for the life of the reader and went on
// being drawn after Alan had rewritten the page. The caller reads the page instead, and reads it
// again every time, so what is drawn is what the page says now.
export async function readAgentForest(
  subagents: SubagentReader,
  workingColor: string | undefined
): Promise<AgentForest> {
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
    workingColor,
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
