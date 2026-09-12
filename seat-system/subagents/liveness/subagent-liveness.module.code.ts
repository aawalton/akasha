import { SUBAGENT_MARK } from "akasha/agents/read-record/read-record.module.code.ts"
import { transcriptOf } from "akasha/agents/seats/modules/transcript-path/seat-transcript-path.module.code.ts"
import {
  createSubagentReader,
  type SubagentNode,
} from "akasha/code/editor/extension/subagent-reading/subagent-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

const AGENT_ID = "agentId"

export type Liveness = "working" | "returned" | "unread"

export type Read = { readonly liveness: Liveness; readonly why: string }

export type Reading = (root: string, page: string, own?: string) => Promise<Read>

const NO_AGENT_ID = "the page states no agent id, so no seat's transcript was named"

const NO_TRANSCRIPT = "the seat states no transcript, so nothing said whether it runs"

const RUNS = "the transcript names it as running"

const HAS_RETURNED = "the transcript was read and names it nowhere"

function thrownAs(thrown: unknown): string {
  const said = thrown instanceof Error ? thrown.message : String(thrown)
  return `the transcript would not be read: ${said}`
}

export type Acting = { readonly seatId: string; readonly own: string }

export function namedAmong(nodes: readonly SubagentNode[], own: string): boolean {
  return nodes.some((one) => one.agentId === own || namedAmong(one.children, own))
}

export function actingAs(root: string, page: string): Acting | null {
  const value = valueAt(page, root)
  const agentId = value === null ? null : textAt(value, AGENT_ID)
  if (agentId === null) return null
  const mark = agentId.indexOf(SUBAGENT_MARK)
  if (mark <= 0) return null
  return { seatId: agentId.slice(0, mark), own: agentId.slice(mark + SUBAGENT_MARK.length) }
}

export async function readOf(root: string, page: string, own?: string): Promise<Read> {
  try {
    const acting = actingAs(root, page)
    if (acting === null) return { liveness: "unread", why: NO_AGENT_ID }
    const named = transcriptOf(acting.seatId)?.value
    if (named === undefined || named === "") return { liveness: "unread", why: NO_TRANSCRIPT }
    const running = await createSubagentReader().forSeat(acting.seatId, named)
    return namedAmong(running, own ?? acting.own)
      ? { liveness: "working", why: RUNS }
      : { liveness: "returned", why: HAS_RETURNED }
  } catch (thrown) {
    return { liveness: "unread", why: thrownAs(thrown) }
  }
}

export async function livenessOf(root: string, page: string, own?: string): Promise<Liveness> {
  return (await readOf(root, page, own)).liveness
}
