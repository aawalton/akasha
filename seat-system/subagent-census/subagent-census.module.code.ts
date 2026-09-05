import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { SUBAGENT_MARK } from "@akasha/command-system/reading"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { supervisorsRootDir } from "@akasha/seat-system/supervisor-log-path"
import {
  actingAgentPidsFromProc,
  type ProcLivenessEntry,
} from "../seat-proc-liveness/seat-proc-liveness.module.code.ts"
import { LOG_AT, SUBAGENTS_AT } from "../subagents/presence/subagent-presence.module.code.ts"

// WHAT ANSWERS FOR A SUBAGENT, AND WHAT ANSWERS FOR NOBODY. A subagent's page is the restart
// interlock: `standingSubagentsOf` reads the pages on disk, so a page left behind refuses to
// restart an idle seat and a page taken away too early restarts a seat under a live subagent. The
// second is the harm worth guarding, so every judgement here is evidence rather than a guess, and
// anything the evidence does not settle is left alone.
//
// THREE THINGS ARE EVIDENCE. A live process acting under the page's agent id proves the subagent
// is at work. A `take` line in the seat's subagent-presence log proves the take-down ran and the
// landing dropped it, because that log is written only where a landing refused. No process running
// as the page's seat proves the seat that would host the subagent is gone. Nothing else is read,
// and a page's age is read nowhere at all: a page written days ago under a Claude process that has
// been up longer says nothing about whether the subagent inside it returned.
//
// A FOURTH IS EVIDENCE OF LIFE AND OF NOTHING ELSE. A seat's transcript names the subagents that
// seat launched and has not seen return, which is exactly what an acting agent id cannot see: a
// subagent waiting on the model runs no process to carry one. Those ids arrive as `runningOwn` and
// are read for one purpose, which is to lift a page to working. That asymmetry is deliberate. A
// transcript learns an agent id from the launch receipt alone, so a compacted or truncated one
// yields a running entry naming no id, which joins to no page. Read to prove life, such an entry
// costs a live subagent nothing worse than undetermined. Read to prove an end, the same entry would
// take away a working subagent's page and blind the interlock this whole census is here to keep.

const SEAT = "principalSeatName"

const AGENT = "agentId"

const SUFFIX = ".subagent.ts"

// A LINE MAY OPEN WITH THE TIME IT WAS WRITTEN. The presence log stamps every line it writes, and
// the lines written before it did carry none, so both are read. Anchoring on the stamp alone would
// have read the whole log as holding no take-down at all the moment the stamp went on.
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

export function partedAgentId(agentId: string): { seatId: string; own: string } {
  const at = agentId.indexOf(SUBAGENT_MARK)
  if (at === -1) return { seatId: "", own: "" }
  return { seatId: agentId.slice(0, at), own: agentId.slice(at + SUBAGENT_MARK.length) }
}

export function pagesIn(root: string): readonly SubagentPage[] {
  let names: readonly string[]
  try {
    names = readdirSync(join(root, SUBAGENTS_AT))
  } catch {
    return []
  }
  const pages: SubagentPage[] = []
  for (const name of [...names].sort()) {
    if (!name.endsWith(SUFFIX)) continue
    const path = `${SUBAGENTS_AT}/${name}`
    const absolute = join(root, path)
    const named = partedIn(absolute)
    const agentId = statedAt(absolute, root, AGENT)
    pages.push({
      path,
      slug: named === null ? name.slice(0, -SUFFIX.length) : named.slug,
      seatName: statedAt(absolute, root, SEAT),
      agentId,
      ...partedAgentId(agentId),
    })
  }
  return pages
}

// A LOG LINE IS WRITTEN ONLY WHERE A LANDING REFUSED, so every `take` line in it names a subagent
// whose stop hook fired and whose page did not go. That is a record of the subagent being done
// rather than an inference from one.
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
      const read = TAKEN.exec(line)
      if (read !== undefined && read !== null) held.add(`${read[1] ?? ""} ${read[2] ?? ""}`)
    }
  }
  return held
}

// A REMOVAL LEANS ON NO COMMAND LINE. `liveAgentPidsFromProc` counts a seat alive only where one of
// its own processes matches the Claude child or the supervisor pattern, and a pattern that stopped
// matching would read every seat as gone and take away every page under it. What is asked here is
// weaker and safer: whether any process at all carries the seat's agent id. A process a seat left
// behind reads the seat as alive, which leaves its pages undetermined rather than removed.
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

// WHAT A TRANSCRIPT SAYS IS HANDED IN, as what /proc says is handed in, because reading one opens
// files outside the repository. A call naming none is a call with no transcript evidence, which
// judges exactly as this module judged before there was any.
export function seenIn(
  entries: readonly ProcLivenessEntry[],
  baseDir?: string,
  runningOwn: ReadonlySet<string> = new Set()
): Seen {
  return {
    seatPids: pidsByAgentId(entries),
    actingPids: actingAgentPidsFromProc(entries),
    takenDown: takenDownIn(baseDir),
    runningOwn,
  }
}

function judgedOne(page: SubagentPage, seen: Seen): Judged {
  const pids = seen.actingPids.get(page.agentId) ?? []
  if (pids.length > 0) {
    return { page, verdict: WORKING, pids, why: "a live process acts under this agent id" }
  }
  // THE ONE THING A TRANSCRIPT MAY DO. Every branch below this one can reach STALE, so the
  // transcript is asked before them and answers working or says nothing at all. A page whose own id
  // is empty is a page no transcript entry could name, and it falls through untouched.
  if (seen.runningOwn.has(page.own)) {
    return {
      page,
      verdict: WORKING,
      pids,
      why: "its seat's transcript names it as a subagent that has not returned",
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

export function saidOf(one: Judged): string {
  const named = one.page.seatName === "" ? "no seat" : one.page.seatName
  const agent = one.page.agentId === "" ? "no agent id" : one.page.agentId
  return `${one.verdict.padEnd(12)} ${one.page.slug} — seat ${named}, agent ${agent}, ${saidPids(one.pids)}: ${one.why}`
}

export function talliedOver(judged: readonly Judged[]): string {
  const held = (verdict: Verdict): number => judged.filter((one) => one.verdict === verdict).length
  return (
    `${String(judged.length)} subagent page(s): ${String(held(WORKING))} working, ` +
    `${String(held(STALE))} stale, ${String(held(UNDETERMINED))} undetermined`
  )
}

export function censusOf(judged: readonly Judged[]): readonly string[] {
  return [talliedOver(judged), "", ...judged.map(saidOf)]
}
