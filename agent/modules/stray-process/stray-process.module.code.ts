import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agent/modules/proc-scan/proc-scan.module.code.ts"
import {
  ACTING_NAMED,
  SUBAGENT_MARK,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { akashaSeatPathForAgent } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import {
  type Acting,
  actingIn,
  type Liveness,
  type Read,
  readFor,
} from "akasha/agent/subagent/modules/liveness/subagent-liveness.module.code.ts"

export type Stray = {
  readonly pid: number
  readonly actingAgentId: string
  readonly cmdline: string
}

export type Reading = {
  readonly strays: readonly Stray[]
  readonly unread: readonly string[]
}

export type Answer = Liveness | "gone"

export type Asking = (actingAgentId: string) => Promise<Answer>

export type SeatPaging = (seatId: string) => string | null

export type ReadingFor = (acting: Acting) => Promise<Read>

type Paged = "there" | "gone" | "unread"

function namesASubagent(actingAgentId: string): boolean {
  return actingAgentId.indexOf(SUBAGENT_MARK) > 0
}

const SPELLED = "[A-Za-z0-9_-]+"

const QUOTE = "'"

const REQUOTED = `'"'"'`

const EXPORTED = new RegExp(`export ${ACTING_NAMED}=(${REQUOTED}|${QUOTE})(${SPELLED})\\1\\n`)

export function actingNamedOn(cmdline: string): string | null {
  return EXPORTED.exec(cmdline)?.[2] ?? null
}

export function actingOf(entry: ProcLivenessEntry): string | null {
  const given = entry.actingAgentId
  if (given !== undefined && given !== "") return given
  return actingNamedOn(entry.cmdline)
}

function underSubagents(
  entries: readonly ProcLivenessEntry[]
): ReadonlyMap<string, readonly ProcLivenessEntry[]> {
  const grouped = new Map<string, ProcLivenessEntry[]>()
  for (const one of entries) {
    const acting = actingOf(one)
    if (acting === null) continue
    if (!namesASubagent(acting)) continue
    const held = grouped.get(acting)
    if (held === undefined) grouped.set(acting, [one])
    else held.push(one)
  }
  return grouped
}

export async function strayAmong(
  entries: readonly ProcLivenessEntry[],
  asking: Asking
): Promise<Reading> {
  const grouped = underSubagents(entries)
  const strays: Stray[] = []
  const unread: string[] = []
  for (const actingAgentId of [...grouped.keys()].sort()) {
    const answer = await asking(actingAgentId)
    if (answer === "unread") {
      unread.push(actingAgentId)
      continue
    }
    if (answer === "working") continue
    const group = [...(grouped.get(actingAgentId) ?? [])].sort((a, b) => a.pid - b.pid)
    for (const one of group) strays.push({ pid: one.pid, actingAgentId, cmdline: one.cmdline })
  }
  return { strays, unread }
}

function pagedBy(asking: () => string | null): Paged {
  try {
    return asking() === null ? "gone" : "there"
  } catch {
    return "unread"
  }
}

export async function answerAsked(
  actingAgentId: string,
  paging: SeatPaging = akashaSeatPathForAgent,
  reading: ReadingFor = readFor
): Promise<Answer> {
  const acting = actingIn(actingAgentId)
  if (acting === null) return "unread"
  const seat = pagedBy(() => paging(acting.seatId))
  if (seat !== "there") return seat
  return (await reading(acting)).liveness
}

export async function strayNow(
  entries: readonly ProcLivenessEntry[] = scanProcEntries().entries,
  asking: Asking = answerAsked
): Promise<Reading> {
  return await strayAmong(entries, asking)
}
