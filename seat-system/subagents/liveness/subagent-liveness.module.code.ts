import { SUBAGENT_MARK } from "akasha/agents/read-record/read-record.module.code.ts"
import {
  createSubagentReader,
  type SubagentNode,
} from "akasha/code/editor/extension/subagent-reading/subagent-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { transcriptOf } from "akasha/seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

const AGENT_ID = "agentId"

export type Liveness = "working" | "returned" | "unread"

export type Reading = (root: string, page: string, own?: string) => Promise<Liveness>

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

export async function livenessOf(root: string, page: string, own?: string): Promise<Liveness> {
  try {
    const acting = actingAs(root, page)
    if (acting === null) return "unread"
    const named = transcriptOf(acting.seatId)?.value
    if (named === undefined || named === "") return "unread"
    const running = await createSubagentReader().forSeat(acting.seatId, named)
    return namedAmong(running, own ?? acting.own) ? "working" : "returned"
  } catch {
    return "unread"
  }
}
