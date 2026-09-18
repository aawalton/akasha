import { resolve } from "node:path"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agent/modules/proc-scan/proc-scan.module.code.ts"
import { dropReadings } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  akashaHolderPidOf,
  akashaSeatsThatExist,
} from "akasha/agent/seat/page/modules/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { transcriptOf } from "akasha/agent/seat/session/modules/seat-transcript-path/seat-transcript-path.module.code.ts"
import {
  censusOf,
  type Judged,
  judgedOver,
  pagesIn,
  type SubagentPage,
  seenIn,
  staleAmong,
} from "akasha/agent/subagent/modules/census/subagent-census.module.code.ts"
import {
  clientStartedAt,
  outlivedAmong,
  subagentsDirOf,
} from "akasha/agent/subagent/modules/outliving/subagent-outliving.module.code.ts"
import {
  pagelessAmong,
  pagelessSaid,
} from "akasha/agent/subagent/modules/pageless/subagent-pageless.module.code.ts"
import {
  leftWhereItIs,
  seatPageIn,
  stoppedBeside,
} from "akasha/agent/subagent/modules/presence/subagent-presence.module.code.ts"
import {
  droppedFor,
  movedOnto,
  saidOf,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import type {
  Asking,
  Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  createSubagentReader,
  type SubagentNode,
} from "akasha/code/editor/extension/modules/subagent-reading/subagent-reading.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { remove } from "akasha/command/argument/pages/remove.argument.ts"
import {
  answeredWith,
  answering,
  naming,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { agentSubagentSweep as page } from "akasha/command/pages/agent/subagent-sweep/agent-subagent-sweep.command.ts"

export const TAKE = "change-mechanical/remove-file-of-any-kind"

export interface SeatTranscripts {
  readonly forSeat: (agentId: string, transcriptPath: string) => Promise<readonly SubagentNode[]>
  readonly endedForSeat: (agentId: string, transcriptPath: string) => Promise<readonly string[]>
}

export type TranscriptPathOf = (seatId: string) => string | null

export interface OwnIds {
  readonly running: ReadonlySet<string>
  readonly ended: ReadonlySet<string>
  readonly outlived: ReadonlySet<string>
}

const NO_OWN_IDS: OwnIds = { running: new Set(), ended: new Set(), outlived: new Set() }

export type HolderPidOf = (seatId: string) => number | null

export type RunningSaid = (pages: readonly SubagentPage[]) => Promise<OwnIds>

export type SeatsNow = () => Iterable<string>

const NO_SEATS: SeatsNow = () => []

function seatsNow(): Iterable<string> {
  try {
    return akashaSeatsThatExist().keys()
  } catch {
    return []
  }
}

function ownIdsInto(held: Set<string>, nodes: readonly SubagentNode[]): undefined {
  for (const node of nodes) {
    if (node.agentId !== null && node.agentId !== "") held.add(node.agentId)
    ownIdsInto(held, node.children)
  }
  return undefined
}

export async function runningOwnIn(
  pages: readonly SubagentPage[],
  reading: SeatTranscripts,
  pathOf: TranscriptPathOf,
  pidOf: HolderPidOf = akashaHolderPidOf,
  startedAt: (pid: number) => number | null = clientStartedAt,
  seatsOf: SeatsNow = NO_SEATS
): Promise<OwnIds> {
  const running = new Set<string>()
  const ended = new Set<string>()
  const outlived = new Set<string>()
  const seats = [...new Set([...seatsOf(), ...pages.map((one) => one.seatId)])]
    .filter((one) => one !== "")
    .sort()
  for (const seat of seats) {
    let named: string | null
    try {
      named = pathOf(seat)
    } catch {
      continue
    }
    if (named === null || named === "") continue
    try {
      ownIdsInto(running, await reading.forSeat(seat, named))
    } catch {}
    try {
      for (const one of await reading.endedForSeat(seat, named)) {
        if (one !== "") ended.add(one)
      }
    } catch {}
    try {
      const pid = pidOf(seat)
      if (pid !== null) {
        const owns = pages.filter((one) => one.seatId === seat).map((one) => one.own)
        for (const one of outlivedAmong(owns, subagentsDirOf(named), startedAt(pid))) {
          outlived.add(one)
        }
      }
    } catch {}
  }
  for (const one of running) ended.delete(one)
  return { running, ended, outlived }
}

export async function transcriptsSay(pages: readonly SubagentPage[]): Promise<OwnIds> {
  return runningOwnIn(
    pages,
    createSubagentReader(),
    (seat) => transcriptOf(seat)?.value ?? null,
    akashaHolderPidOf,
    clientStartedAt,
    seatsNow
  )
}

export function stoppedAmong(root: string, pages: readonly SubagentPage[]): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of pages) if (stoppedBeside(root, one.path)) held.add(one.path)
  return held
}

function heldBack(calledAs: string, stale: number): readonly string[] {
  return [
    "",
    `${calledAs} wrote nothing. Say \`${remove.said}\` to take away the ${String(stale)} page(s) ` +
      "judged STALE — a page judged WORKING or UNDETERMINED never goes, whatever the run says.",
  ]
}

const NOTHING_STALE = "no page was judged STALE, so nothing went"

const ALL_KEPT = "every page judged STALE was left where it is, so nothing went"

interface Parted {
  readonly going: readonly Judged[]
  readonly left: readonly string[]
}

function partedStale(root: string, stale: readonly Judged[]): Parted {
  const going: Judged[] = []
  const left: string[] = []
  for (const one of stale) {
    const why = leftWhereItIs(root, one.page.seatName, one.page.path)
    if (why === null) going.push(one)
    else left.push(`${one.page.slug} — ${why}`)
  }
  return { going, left }
}

function keptSaid(left: readonly string[]): readonly string[] {
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
  moving(root, stale, done)
  const changes: readonly Asking[] = stale.map((one) => ({
    at: TAKE,
    given: { at: one.page.path },
  }))
  const landed = await landing(root, changes, messageOf(stale), { done })
  if ("refusals" in landed) return answeredWith(done, landed.refusals, OPERATIONAL)
  if (landed.wrong.length > 0) return answeredWith(done, landed.wrong, OPERATIONAL)
  for (const one of stale) done.push(`${one.page.path} went`)
  dropReadings(
    root,
    stale.map((one) => one.page.path)
  )
  draining(root, stale, done)
  return told(done)
}

export async function agentSubagentSweep(
  argv: readonly string[],
  given: Given,
  entries: readonly ProcLivenessEntry[] = scanProcEntries().entries,
  baseDir?: string,
  said: RunningSaid = transcriptsSay,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [remove])
  if ("refused" in read) return refusedBy(read.refused)
  const root = resolve(given.root)
  const pages = pagesIn(root)
  let own: OwnIds = NO_OWN_IDS
  try {
    own = await said(pages)
  } catch {
    own = NO_OWN_IDS
  }
  const judged = judgedOver(
    pages,
    seenIn(entries, baseDir, own.running, own.ended, own.outlived, stoppedAmong(root, pages))
  )
  const census = censusOf(judged)
  const { going, left } = partedStale(root, staleAmong(judged))
  const kept = keptSaid(left)
  if (!read.taken.remove) {
    const loose = pagelessSaid(pagelessAmong(pages, own.running))
    return told([...census, ...kept, ...loose, ...heldBack(given.calledAs, going.length)])
  }
  if (going.length === 0) {
    const why = left.length === 0 ? NOTHING_STALE : ALL_KEPT
    return told([...census, ...kept, "", why])
  }
  const gone = await answering(async (done) =>
    naming(done, await taking(root, going, landing, done))
  )
  return answeredWith([...census, ...kept, "", ...gone.report], gone.refusals, gone.code)
}
