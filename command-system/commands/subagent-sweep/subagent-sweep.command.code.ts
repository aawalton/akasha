import { resolve } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import type { FileEdit } from "@akasha/command-system/landing"
import { dropReadings } from "@akasha/command-system/reading"
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
import { transcriptOf } from "../../../seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"
import { type Answer, answering, type Given } from "../../calling/calling.module.code.ts"

// A CENSUS BY DEFAULT, BECAUSE THE WRONG REMOVAL IS THE HARM. A subagent's page is the restart
// interlock, so taking away the page of a subagent that is at work tells `sr` the seat is idle and
// it restarts under a live agent. A run therefore says what it found and writes nothing, and a
// person reads that census before a second run is told to act on it.
//
// WHAT GOES IS WHAT THE CENSUS CALLED STALE, which is evidence rather than age. A page judged
// working or undetermined is never removed however the run was called.
//
// WHAT WAS READ OFF /proc AND OUT OF THE LOGS IS A PARAMETER, so a test seeds a live process and
// watches the page it answers for kept, which is the one failure this command must never make.
//
// THE TRANSCRIPTS ARE READ HERE, FOR LIFE AND FOR AN END. An acting agent id names a subagent mid
// tool call alone, so a subagent waiting on the model looks the same as one the model reaped, and
// most of the fleet reads undetermined. A seat's transcript tells the two apart: it names every
// subagent launched that has not returned, and it names every subagent it saw start and then
// finish. Both readings rest on one fact, which is that a transcript learns an agent id from the
// launch receipt. A compacted or truncated transcript therefore names a running subagent with no id
// at all, which joins to no page, and it has no id to end either. Each reading costs an id rather
// than inventing one. What is never read is the absence of a running entry, which a truncated
// transcript and a finished subagent produce alike. So a transcript that will not open, a seat
// naming none, and a reading that throws are each worth exactly nothing here rather than worth a
// removal.

const REMOVE = "--remove"

const CALLED_AS = "akasha subagent sweep"

export type Read = { readonly removing: boolean } | { readonly refused: string }

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

// AN ENTRY NAMING NO AGENT ID IS DROPPED RATHER THAN CARRIED AS AN EMPTY NAME, so nothing
// downstream has to tell an unnamed subagent from a page that states no id of its own.
function ownIdsInto(held: Set<string>, nodes: readonly SubagentNode[]): undefined {
  for (const node of nodes) {
    if (node.agentId !== null && node.agentId !== "") held.add(node.agentId)
    ownIdsInto(held, node.children)
  }
  return undefined
}

// ONE SEAT'S FAILURE COSTS THAT SEAT ALONE. Each seat is asked apart from the others and a throw
// leaves the ids gathered so far, because a reading that answers for fewer subagents than there are
// leaves pages undetermined, and undetermined pages are never removed.
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
    // ONE SEAT'S END READING IS ITS OWN TRY. A seat whose running reading threw may still answer
    // for its ended ids, and a seat whose ended reading throws keeps the running ids already
    // gathered. Neither failure reaches the other seat or the other reading.
    try {
      for (const one of await reading.endedForSeat(seat, named)) {
        if (one !== "") ended.add(one)
      }
    } catch {}
  }
  // AN ID BOTH READINGS NAME IS RUNNING. The census asks life before it asks an end, so this would
  // settle the same way without the line; it is here because a set answered from this function
  // should mean what its name says on its own.
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

async function taking(root: string, stale: readonly Judged[]): Promise<Answer> {
  const changes: readonly FileEdit[] = stale.map((one) => ({ path: one.page.path, body: null }))
  const gone = await landedMechanically(root, CALLED_AS, changes, messageOf(stale))
  if (gone.code !== 0) return gone
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

export async function subagentSweep(
  argv: readonly string[],
  given: Given,
  entries: readonly ProcLivenessEntry[] = scanProcEntries().entries,
  baseDir?: string,
  said: RunningSaid = transcriptsSay
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
  const gone = await taking(root, stale)
  if (gone.code !== 0) return answering([...census, ""], [...gone.refusals], gone.code)
  return answering([...census, "", ...gone.report], [], 0)
}
