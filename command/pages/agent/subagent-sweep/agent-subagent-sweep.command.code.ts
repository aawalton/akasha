import { resolve } from "node:path"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agent/modules/proc-scan/proc-scan.module.code.ts"
import {
  akashaHolderPidOf,
  akashaSeatsThatExist,
} from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { transcriptOf } from "akasha/agent/seat/session/modules/seat-transcript-path/seat-transcript-path.module.code.ts"
import {
  censusOf,
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
  keptSaid,
  partedStale,
  stoppedAmong,
  takenAway,
} from "akasha/agent/subagent/modules/stale-taking/subagent-stale-taking.module.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
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
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { agentSubagentSweep as page } from "akasha/command/pages/agent/subagent-sweep/agent-subagent-sweep.command.ts"

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

const noSeats: SeatsNow = () => []

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
  seatsOf: SeatsNow = noSeats
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

function heldBack(calledAs: string, stale: number): readonly string[] {
  return [
    "",
    `${calledAs} wrote nothing. Say \`${remove.said}\` to take away the ${String(stale)} page(s) ` +
      "judged STALE — a page judged WORKING or UNDETERMINED never goes, whatever the run says.",
  ]
}

const NOTHING_STALE = "no page was judged STALE, so nothing went"

const ALL_KEPT = "every page judged STALE was left where it is, so nothing went"

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
    naming(done, await takenAway(root, going, landing, done))
  )
  return answeredWith([...census, ...kept, "", ...gone.report], gone.refusals, gone.code)
}
