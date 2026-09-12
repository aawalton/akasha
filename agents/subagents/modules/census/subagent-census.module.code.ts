import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  actingAgentPidsFromProc,
  type ProcLivenessEntry,
} from "akasha/agents/proc-liveness/agent-proc-liveness.module.code.ts"
import { SUBAGENT_MARK } from "akasha/agents/read-record/read-record.module.code.ts"
import { supervisorsRootDir } from "akasha/agents/seats/supervisors/modules/log-path/supervisor-log-path.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { LOG_AT } from "akasha/seat-system/subagents/presence/subagent-presence.module.code.ts"

const SEAT = "principalSeatName"

const AGENT = "agentId"

const SUBAGENT = "subagent"

const SLUG = "slug"

const TAKEN = /^(?:\S+ )?subagent-presence: take (\S+) (\S+) — /

export const WORKING = "WORKING"

export const STALE = "STALE"

export const UNDETERMINED = "UNDETERMINED"

export type Verdict = typeof WORKING | typeof STALE | typeof UNDETERMINED

export interface SubagentPage {
  readonly path: string
  readonly slug: string
  readonly seatName: string
  readonly agentId: string
  readonly seatId: string
  readonly own: string
}

export interface Seen {
  readonly seatPids: ReadonlyMap<string, readonly number[]>
  readonly actingPids: ReadonlyMap<string, readonly number[]>
  readonly takenDown: ReadonlySet<string>
  readonly runningOwn: ReadonlySet<string>
  readonly endedOwn: ReadonlySet<string>
  readonly outlivedOwn: ReadonlySet<string>
}

export interface Judged {
  readonly page: SubagentPage
  readonly verdict: Verdict
  readonly pids: readonly number[]
  readonly why: string
}

function statedAt(absolute: string, root: string, key: string): string {
  const value = valueAt(absolute, root)
  const said = value === null ? null : textAt(value, key)
  return said === null ? "" : said
}

function partedAgentId(agentId: string): { seatId: string; own: string } {
  const at = agentId.indexOf(SUBAGENT_MARK)
  if (at === -1) return { seatId: "", own: "" }
  return { seatId: agentId.slice(0, at), own: agentId.slice(at + SUBAGENT_MARK.length) }
}

export function pagesIn(root: string): readonly SubagentPage[] {
  const pages: SubagentPage[] = []
  for (const one of valuesOfType(root, SUBAGENT)) {
    const absolute = join(root, one.path)
    const named = partedIn(absolute)
    const agentId = statedAt(absolute, root, AGENT)
    pages.push({
      path: one.path,
      slug: named?.slug ?? textAt(one.value, SLUG) ?? "",
      seatName: statedAt(absolute, root, SEAT),
      agentId,
      ...partedAgentId(agentId),
    })
  }
  return pages
}

function parseTakenPair(found: RegExpExecArray | null): string | null {
  if (found === null) return null
  return `${found[1] ?? ""} ${found[2] ?? ""}`
}

export function takenDownIn(baseDir: string = supervisorsRootDir()): ReadonlySet<string> {
  const held = new Set<string>()
  let names: readonly string[]
  try {
    names = readdirSync(baseDir)
  } catch {
    return held
  }
  for (const one of names) {
    let text: string
    try {
      text = readFileSync(join(baseDir, one, LOG_AT), "utf8")
    } catch {
      continue
    }
    for (const line of text.split("\n")) {
      const taken = parseTakenPair(TAKEN.exec(line))
      if (taken !== null) held.add(taken)
    }
  }
  return held
}

function pidsByAgentId(entries: readonly ProcLivenessEntry[]): Map<string, number[]> {
  const byId = new Map<string, number[]>()
  for (const { agentId, pid } of entries) {
    if (agentId === "") continue
    const existing = byId.get(agentId)
    if (existing === undefined) byId.set(agentId, [pid])
    else existing.push(pid)
  }
  return byId
}

export function seenIn(
  entries: readonly ProcLivenessEntry[],
  baseDir?: string,
  runningOwn: ReadonlySet<string> = new Set(),
  endedOwn: ReadonlySet<string> = new Set(),
  outlivedOwn: ReadonlySet<string> = new Set()
): Seen {
  return {
    seatPids: pidsByAgentId(entries),
    actingPids: actingAgentPidsFromProc(entries),
    takenDown: takenDownIn(baseDir),
    runningOwn,
    endedOwn,
    outlivedOwn,
  }
}

function judgedOne(page: SubagentPage, seen: Seen): Judged {
  const pids = seen.actingPids.get(page.agentId) ?? []
  if (pids.length > 0) {
    return { page, verdict: WORKING, pids, why: "a live process acts under this agent id" }
  }
  if (page.own !== "" && seen.outlivedOwn.has(page.own)) {
    return {
      page,
      verdict: STALE,
      pids,
      why: "its last record came before the start of the client its seat runs now, and a client runs no subagent already open",
    }
  }
  if (page.own !== "" && seen.runningOwn.has(page.own)) {
    return {
      page,
      verdict: WORKING,
      pids,
      why: "its seat's transcript names it as a subagent that has not returned",
    }
  }
  if (page.own !== "" && seen.endedOwn.has(page.own)) {
    return {
      page,
      verdict: STALE,
      pids,
      why: "its seat's transcript names it as a subagent that started and returned",
    }
  }
  if (page.agentId === "" || page.seatId === "") {
    return {
      page,
      verdict: UNDETERMINED,
      pids,
      why: "the page states no agent id a process could be matched against",
    }
  }
  if (seen.takenDown.has(`${page.seatName} ${page.own}`)) {
    return {
      page,
      verdict: STALE,
      pids,
      why: "its take-down ran and the landing dropped it, which the seat's subagent-presence log says",
    }
  }
  const seat = seen.seatPids.get(page.seatId) ?? []
  if (seat.length === 0) {
    return {
      page,
      verdict: STALE,
      pids,
      why: "no process at all carries its seat's agent id, so the seat that would host it is gone",
    }
  }
  return {
    page,
    verdict: UNDETERMINED,
    pids,
    why: `its seat is on ${String(seat.length)} process(es) and none acts under this agent id, which is what a subagent waiting on the model looks like too`,
  }
}

export function judgedOver(pages: readonly SubagentPage[], seen: Seen): readonly Judged[] {
  return pages.map((page) => judgedOne(page, seen))
}

export function staleAmong(judged: readonly Judged[]): readonly Judged[] {
  return judged.filter((one) => one.verdict === STALE)
}

function saidPids(pids: readonly number[]): string {
  return pids.length === 0 ? "no live process answers" : `pid ${pids.join(", ")} answers`
}

function saidOf(one: Judged): string {
  const named = one.page.seatName === "" ? "no seat" : one.page.seatName
  const agent = one.page.agentId === "" ? "no agent id" : one.page.agentId
  return `${one.verdict.padEnd(12)} ${one.page.slug} — seat ${named}, agent ${agent}, ${saidPids(one.pids)}: ${one.why}`
}

function talliedOver(judged: readonly Judged[]): string {
  const held = (verdict: Verdict): number => judged.filter((one) => one.verdict === verdict).length
  return (
    `${String(judged.length)} subagent page(s): ${String(held(WORKING))} working, ` +
    `${String(held(STALE))} stale, ${String(held(UNDETERMINED))} undetermined`
  )
}

export function censusOf(judged: readonly Judged[]): readonly string[] {
  return [talliedOver(judged), "", ...judged.map(saidOf)]
}
