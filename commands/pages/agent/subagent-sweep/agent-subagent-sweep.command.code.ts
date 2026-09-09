import { resolve } from "node:path"
import type { Asking } from "@akasha/changes/mechanical-change-running"
import { runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { createSubagentReader, type SubagentNode } from "@akasha/editor-extension/subagent-reading"
import { scanProcEntries } from "@akasha/seat-system/proc-scan"
import type { ProcLivenessEntry } from "@akasha/seat-system/seat-proc-liveness"
import {
  censusOf,
  type Judged,
  judgedOver,
  pagesIn,
  type SubagentPage,
  seenIn,
  staleAmong,
} from "@akasha/seat-system/subagent-census"
import {
  type Answer,
  answering,
  type Given,
} from "../../../../command-system/calling/calling.module.code.ts"
import { transcriptOf } from "../../../../seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"
import { dropReadings } from "../../../modules/reading/reading.module.code.ts"

const REMOVE = "--remove"

const CALLED_AS = "akasha agent subagent sweep"

export const TAKE = "change-mechanical-file/remove-file"

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
}

export const NO_OWN_IDS: OwnIds = { running: new Set(), ended: new Set() }

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
  pathOf: TranscriptPathOf
): Promise<OwnIds> {
  const running = new Set<string>()
  const ended = new Set<string>()
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
  }
  for (const one of running) ended.delete(one)
  return { running, ended }
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

async function taking(root: string, stale: readonly Judged[], landing: Landing): Promise<Answer> {
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
  return answering(
    stale.map((one) => `${one.page.path} went`),
    [],
    0
  )
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
  const judged = judgedOver(pages, seenIn(entries, baseDir, own.running, own.ended))
  const census = censusOf(judged)
  const stale = staleAmong(judged)
  if (!read.removing) return answering([...census, ...heldBack(stale.length)], [], 0)
  if (stale.length === 0) {
    return answering([...census, "", "no page was judged STALE, so nothing went"], [], 0)
  }
  const gone = await taking(root, stale, landing)
  if (gone.code !== 0) return answering([...census, ""], [...gone.refusals], gone.code)
  return answering([...census, "", ...gone.report], [], 0)
}
