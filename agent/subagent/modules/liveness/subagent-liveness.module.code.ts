import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { transcriptOf } from "akasha/agent/seat/session/modules/seat-transcript-path/seat-transcript-path.module.code.ts"
import {
  createSubagentReader,
  type SubagentNode,
  type SubagentReading,
} from "akasha/code/editor/extension/modules/subagent-reading/subagent-reading.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

const AGENT_ID = "agentId"

export type Liveness = "working" | "returned" | "unread"

export type Read = { readonly liveness: Liveness; readonly why: string }

export type Reading = (root: string, page: string, own?: string) => Promise<Read>

const NO_AGENT_ID = "the page states no agent id, so no seat's transcript was named"

const NO_TRANSCRIPT = "the seat states no transcript, so nothing said whether it runs"

const RUNS = "the transcript names it as running"

const HAS_RETURNED = "the transcript records the result it returned"

const NAMED_NOWHERE = "the transcript was read and names it nowhere, so it records no return"

function thrownAs(thrown: unknown): string {
  const said = thrown instanceof Error ? thrown.message : String(thrown)
  return `the transcript would not be read: ${said}`
}

export type Acting = { readonly seatId: string; readonly own: string }

export function namedAmong(nodes: readonly SubagentNode[], own: string): boolean {
  return nodes.some((one) => one.agentId === own || namedAmong(one.children, own))
}

export function actingIn(agentId: string): Acting | null {
  const mark = agentId.indexOf(SUBAGENT_MARK)
  if (mark <= 0) return null
  return { seatId: agentId.slice(0, mark), own: agentId.slice(mark + SUBAGENT_MARK.length) }
}

function actingAs(root: string, page: string): Acting | null {
  const value = valueAt(page, root)
  const agentId = value === null ? null : textAt(value, AGENT_ID)
  return agentId === null ? null : actingIn(agentId)
}

export type Transcripts = {
  readonly readingForSeat: (seatId: string, at: string) => Promise<SubagentReading>
  readonly endedForSeat: (seatId: string, at: string) => Promise<readonly string[]>
}

export type TranscriptAt = (seatId: string) => string | null

const transcriptAt: TranscriptAt = (seatId) => transcriptOf(seatId)?.value ?? null

export async function readFor(
  acting: Acting,
  at: TranscriptAt = transcriptAt,
  reading: Transcripts = createSubagentReader()
): Promise<Read> {
  try {
    const named = at(acting.seatId)
    if (named === null || named === "") return { liveness: "unread", why: NO_TRANSCRIPT }
    const read = await reading.readingForSeat(acting.seatId, named)
    if (namedAmong(read.running, acting.own)) return { liveness: "working", why: RUNS }
    if (read.ended.includes(acting.own)) return { liveness: "returned", why: HAS_RETURNED }
    const ended = await reading.endedForSeat(acting.seatId, named)
    if (ended.includes(acting.own)) return { liveness: "returned", why: HAS_RETURNED }
    return { liveness: "unread", why: NAMED_NOWHERE }
  } catch (thrown) {
    return { liveness: "unread", why: thrownAs(thrown) }
  }
}

export async function readOf(root: string, page: string, own?: string): Promise<Read> {
  try {
    const acting = actingAs(root, page)
    if (acting === null) return { liveness: "unread", why: NO_AGENT_ID }
    return await readFor(own === undefined ? acting : { seatId: acting.seatId, own })
  } catch (thrown) {
    return { liveness: "unread", why: thrownAs(thrown) }
  }
}
