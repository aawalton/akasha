import { resolve } from "node:path"
import { editsWaiting } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  createSubagentReader,
  type SubagentNode,
} from "akasha/editor-extension/subagent-reading/subagent-reading.module.code.ts"
import { mergeUncommitted } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { scanProcEntries } from "akasha/seat-system/proc-scan/proc-scan.module.code.ts"
import { akashaHolderProcessOf } from "akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { parseSeatProcKey } from "akasha/seat-system/seat-proc-key/seat-proc-key.module.code.ts"
import type { ProcLivenessEntry } from "akasha/seat-system/seat-proc-liveness/seat-proc-liveness.module.code.ts"
import {
  censusOf,
  type Judged,
  judgedOver,
  pagesIn,
  type SubagentPage,
  seenIn,
  staleAmong,
} from "akasha/seat-system/subagent-census/subagent-census.module.code.ts"
import {
  clientStartedAt,
  outlivedAmong,
  subagentsDirOf,
} from "akasha/seat-system/subagent-outliving/subagent-outliving.module.code.ts"
import {
  movedOnto,
  saidOf,
} from "akasha/seat-system/subagent-recovering/subagent-recovering.module.code.ts"
import { seatPageIn } from "akasha/seat-system/subagents/presence/subagent-presence.module.code.ts"
import { transcriptOf } from "../../../../seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"
import { subagentReturned } from "../../../../seat-system/subagents/properties/subagent-returned.boolean-property.ts"
import { type Answer, answering, type Given } from "../../../modules/calling/calling.module.code.ts"
import { dropReadings } from "../../../modules/reading/reading.module.code.ts"

const REMOVE = "--remove"

const CALLED_AS = "akasha agent subagent sweep"

export const TAKE = "change-mechanical/remove-file-of-any-kind"

const WRONG = 3

export type Read = { readonly removing: boolean } | { readonly refused: string }

export type Landing = (
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof runMechanicalChange>

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

export const NO_OWN_IDS: OwnIds = { running: new Set(), ended: new Set(), outlived: new Set() }

export type HolderPidOf = (seatId: string) => number | null

export function holderPidOf(seatId: string): number | null {
  const held = akashaHolderProcessOf(seatId)
  if (held === null) return null
  return parseSeatProcKey(held)?.pid ?? null
}

export type RunningSaid = (pages: readonly SubagentPage[]) => Promise<OwnIds>

export function namedIn(argv: readonly string[]): Read {
  let removing = false
  for (const token of argv) {
    if (token === REMOVE) {
      removing = true
      continue
    }
    return {
      refused:
        `\`${token}\` is not a word this takes — a sweep takes \`${REMOVE}\` and nothing else, ` +
        "and a run naming nothing reports without writing",
    }
  }
  return { removing }
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
  pidOf: HolderPidOf = holderPidOf,
  startedAt: (pid: number) => number | null = clientStartedAt
): Promise<OwnIds> {
  const running = new Set<string>()
  const ended = new Set<string>()
  const outlived = new Set<string>()
  const seats = [...new Set(pages.map((one) => one.seatId))].filter((one) => one !== "").sort()
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

async function transcriptsSay(pages: readonly SubagentPage[]): Promise<OwnIds> {
  return runningOwnIn(pages, createSubagentReader(), (seat) => transcriptOf(seat)?.value ?? null)
}

export function heldBack(stale: number): readonly string[] {
  return [
    "",
    `${CALLED_AS} wrote nothing. Say \`${REMOVE}\` to take away the ${String(stale)} page(s) ` +
      "judged STALE — a page judged WORKING or UNDETERMINED never goes, whatever the run says.",
  ]
}

const NOTHING_STALE = "no page was judged STALE, so nothing went"

const ALL_KEPT = "every page judged STALE keeps edits, so nothing went"

function keptSaid(waiting: readonly Judged[]): readonly string[] {
  if (waiting.length === 0) return []
  return [
    "",
    `${String(waiting.length)} page(s) the census judged STALE are kept, because a subagent left ` +
      `edits waiting beside each: ${waiting.map((one) => one.page.slug).join(", ")}`,
  ]
}

export function messageOf(stale: readonly Judged[]): string {
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

function moving(root: string, stale: readonly Judged[]): readonly string[] {
  const said: string[] = []
  for (const one of stale) {
    const seat = seatPageIn(root, one.page.seatName)
    if (seat === null) continue
    said.push(...saidOf(one.page.slug, movedOnto(root, seat, one.page.path)))
  }
  return said
}

async function taking(root: string, stale: readonly Judged[], landing: Landing): Promise<Answer> {
  const moved = moving(root, stale)
  const changes: readonly Asking[] = stale.map((one) => ({
    at: TAKE,
    given: { at: one.page.path },
  }))
  const landed = await landing(root, changes, messageOf(stale))
  if ("refusals" in landed) return answering([], landed.refusals, WRONG)
  if (landed.wrong.length > 0) return answering([], landed.wrong, WRONG)
  dropReadings(
    root,
    stale.map((one) => one.page.path)
  )
  return answering([...moved, ...stale.map((one) => `${one.page.path} went`)], [], 0)
}

export async function agentSubagentSweep(
  argv: readonly string[],
  given: Given,
  entries: readonly ProcLivenessEntry[] = scanProcEntries().entries,
  baseDir?: string,
  said: RunningSaid = transcriptsSay,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  const read = namedIn(argv)
  if ("refused" in read) return answering([], [read.refused], 1)
  const root = resolve(given.root)
  const pages = pagesIn(root)
  let own: OwnIds = NO_OWN_IDS
  try {
    own = await said(pages)
  } catch {
    own = NO_OWN_IDS
  }
  const judged = judgedOver(pages, seenIn(entries, baseDir, own.running, own.ended, own.outlived))
  const census = censusOf(judged)
  const judgedStale = staleAmong(judged)
  const waiting = judgedStale.filter((one) => editsWaiting(root, one.page.path))
  for (const one of waiting) {
    mergeUncommitted(root, one.page.path, { [subagentReturned.propertySlug]: true })
  }
  const stale = judgedStale.filter((one) => !waiting.includes(one))
  const kept = keptSaid(waiting)
  if (!read.removing) return answering([...census, ...kept, ...heldBack(stale.length)], [], 0)
  if (stale.length === 0) {
    const why = waiting.length === 0 ? NOTHING_STALE : ALL_KEPT
    return answering([...census, ...kept, "", why], [], 0)
  }
  const gone = await taking(root, stale, landing)
  if (gone.code !== 0) return answering([...census, ...kept, ""], [...gone.refusals], gone.code)
  return answering([...census, ...kept, "", ...gone.report], [], 0)
}
