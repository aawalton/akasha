import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  actingAgentPidsFromProc,
  type ProcLivenessEntry,
} from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agent/modules/proc-scan/proc-scan.module.code.ts"
import { dropReadings } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  type Judged,
  judgedOver,
  pagesIn,
  type Seen,
  type SubagentPage,
  staleAmong,
} from "akasha/agent/subagent/modules/census/subagent-census.module.code.ts"
import { seatPageIn } from "akasha/agent/subagent/modules/pages-taking/subagent-pages-taking.module.code.ts"
import {
  leftWhereItIs,
  stoppedBeside,
} from "akasha/agent/subagent/modules/presence/subagent-presence.module.code.ts"
import {
  droppedFor,
  movedOnto,
  saidOf,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { removeFileOfAnyKind } from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.ts"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  answeredWith,
  answering,
  naming,
  OPERATIONAL,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { keptAt } from "akasha/file/modules/git-place/git-place.module.code.ts"

export const TAKE = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const

const SWEEP_LOCK = "akasha-subagent-sweep"

const WAITED_AT_MOST = 1000

export const SWEEP_HELD =
  "another sweep was taking subagent pages away, so this run took none and wrote nothing; " +
  "the next run takes whatever is still stale"

export const ALL_GONE =
  "every page judged STALE had gone before this run could take it, so nothing went"

export function sweepLockIn(root: string): string {
  return join(root, keptAt(SWEEP_LOCK))
}

export function stoppedAmong(root: string, pages: readonly SubagentPage[]): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of pages) if (stoppedBeside(root, one.path)) held.add(one.path)
  return held
}

export interface Parted {
  readonly going: readonly Judged[]
  readonly left: readonly string[]
}

export function partedStale(root: string, stale: readonly Judged[]): Parted {
  const going: Judged[] = []
  const left: string[] = []
  for (const one of stale) {
    const why = leftWhereItIs(root, one.page.seatName, one.page.path)
    if (why === null) going.push(one)
    else left.push(`${one.page.slug} — ${why}`)
  }
  return { going, left }
}

export function keptSaid(left: readonly string[]): readonly string[] {
  if (left.length === 0) return []
  return [
    "",
    `${String(left.length)} page(s) the census judged STALE are left where they are:`,
    ...left,
  ]
}

function messageOf(stale: readonly Judged[]): string {
  return [
    `${String(stale.length)} subagent page(s) go, one for each subagent nothing says is at work`,
    "",
    "A page is judged from evidence rather than from age: a live process acting under its agent",
    "id, a take-down its seat's subagent-presence log says was refused, or no process at all",
    "carrying its seat's agent id. These are the pages the evidence settled as done.",
    "",
    ...stale.map((one) => `${one.page.slug} — ${one.why}`),
  ].join("\n")
}

function moving(root: string, stale: readonly Judged[], done: string[]): undefined {
  for (const one of stale) {
    const seat = seatPageIn(root, one.page.seatName)
    if (seat === null) continue
    done.push(...saidOf(one.page.slug, movedOnto(root, seat, one.page.path)))
  }
  return undefined
}

function draining(root: string, stale: readonly Judged[], done: string[]): undefined {
  const bySeat = new Map<string, string[]>()
  for (const one of stale) {
    const seat = seatPageIn(root, one.page.seatName)
    if (seat === null) continue
    const held = bySeat.get(seat)
    if (held === undefined) bySeat.set(seat, [one.page.agentId])
    else held.push(one.page.agentId)
  }
  for (const [seat, ids] of bySeat) {
    const went = droppedFor(root, seat, ids)
    if (went > 0) {
      done.push(`${seat} keeps ${String(went)} fewer reading(s), for the subagents that went`)
    }
  }
  return undefined
}

async function taking(
  root: string,
  stale: readonly Judged[],
  landing: Landing,
  done: string[]
): Promise<Answer> {
  const there = stale.filter((one) => existsSync(join(root, one.page.path)))
  if (there.length === 0) {
    done.push(ALL_GONE)
    return told(done)
  }
  moving(root, there, done)
  const changes: readonly Asking[] = there.map((one) => ({
    at: TAKE,
    given: { at: one.page.path },
  }))
  const landed = await landing(root, changes, messageOf(there), { done })
  if ("refusals" in landed) return answeredWith(done, landed.refusals, OPERATIONAL)
  if (landed.wrong.length > 0) return answeredWith(done, landed.wrong, OPERATIONAL)
  for (const one of there) done.push(`${one.page.path} went`)
  dropReadings(
    root,
    there.map((one) => one.page.path)
  )
  draining(root, there, done)
  return told(done)
}

export async function takenAway(
  root: string,
  stale: readonly Judged[],
  landing: Landing,
  done: string[]
): Promise<Answer> {
  let held = false
  try {
    return await exclusively(
      sweepLockIn(root),
      () => {
        held = true
        return taking(root, stale, landing, done)
      },
      WAITED_AT_MOST
    )
  } catch (thrown) {
    if (held) throw thrown
    return answeredWith(done, [SWEEP_HELD], OPERATIONAL)
  }
}

export type ProcEntries = () => readonly ProcLivenessEntry[]

const scanned: ProcEntries = () => scanProcEntries().entries

function stoppedSeen(stopped: ReadonlySet<string>, entries: ProcEntries): Seen {
  return {
    seatPids: new Map(),
    actingPids: actingAgentPidsFromProc(entries()),
    takenDown: new Set(),
    runningOwn: new Set(),
    endedOwn: new Set(),
    outlivedOwn: new Set(),
    stoppedPaths: stopped,
  }
}

export async function stoppedTaken(
  root: string,
  landing: Landing = runMechanicalChange,
  entries: ProcEntries = scanned
): Promise<Answer> {
  const pages = pagesIn(root)
  const stopped = stoppedAmong(root, pages)
  if (stopped.size === 0) return told([])
  const judged = judgedOver(
    pages.filter((one) => stopped.has(one.path)),
    stoppedSeen(stopped, entries)
  )
  const { going, left } = partedStale(root, staleAmong(judged))
  const kept = keptSaid(left)
  if (going.length === 0) return told(kept)
  const gone = await answering(async (done) =>
    naming(done, await takenAway(root, going, landing, done))
  )
  return answeredWith([...kept, ...gone.report], gone.refusals, gone.code)
}
