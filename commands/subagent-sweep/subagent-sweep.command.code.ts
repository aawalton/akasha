import { resolve } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import type { FileEdit } from "@akasha/command-system/landing"
import { dropReadings } from "@akasha/command-system/reading"
import { scanProcEntries } from "@akasha/seat-system/proc-scan"
import type { ProcLivenessEntry } from "@akasha/seat-system/seat-proc-liveness"
import {
  censusOf,
  type Judged,
  judgedOver,
  pagesIn,
  seenIn,
  staleAmong,
} from "@akasha/seat-system/subagent-census"
import {
  type Answer,
  answering,
  type Given,
} from "../../command-system/calling/calling.module.code.ts"

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

const REMOVE = "--remove"

const CALLED_AS = "akasha subagent sweep"

export type Read = { readonly removing: boolean } | { readonly refused: string }

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
  baseDir?: string
): Promise<Answer> {
  const read = namedIn(argv)
  if ("refused" in read) return answering([], [read.refused], 1)
  const root = resolve(given.root)
  const judged = judgedOver(pagesIn(root), seenIn(entries, baseDir))
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
