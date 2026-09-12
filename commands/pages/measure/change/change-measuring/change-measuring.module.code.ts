import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  byCpu,
  type Chosen,
  type Costs,
  costOf,
  latestOf,
  partsIn,
  type Run,
  rankedOf,
  runningOf,
  runsRead,
  totalOf,
  underRan,
  withinOf,
} from "akasha/checks/modules/measuring/check-measuring.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export const CHANGE = "change"

const APPLY = "apply"

const ENTRIES = "entries"

const COMMAND = "command"

const SLUGS: readonly string[] = ["change-draft", "change-apply"]

export function pagesIn(root: string): readonly string[] {
  return SLUGS.flatMap((slug) => listedAt(root, COMMAND, slug).map((one) => one.path))
}

export interface Reading {
  readonly runs: readonly Run[]
  readonly unread: readonly string[]
  readonly torn: readonly string[]
}

export function heldIn(root: string): Reading {
  const runs: Run[] = []
  const unread: string[] = []
  const torn: string[] = []
  for (const page of pagesIn(root)) {
    for (const at of partsIn(root, page, ENTRIES)) {
      let body: string
      try {
        body = readFileSync(join(root, at), "utf8")
      } catch {
        unread.push(at)
        continue
      }
      const read = runsRead(body)
      for (const one of read.runs) runs.push(one)
      if (read.torn > 0) torn.push(at)
    }
  }
  return { runs, unread, torn }
}

export function costsIn(root: string, now: number, chosen: Chosen): Costs {
  const reading = heldIn(root)
  const held = reading.runs.filter((one) => one.phase === CHANGE || one.phase === APPLY)
  const within =
    chosen.by === "period"
      ? withinOf(held, now, chosen.ms)
      : runningOf(held, rankedOf(latestOf(held), chosen.runs))
  const checks = [...underRan(within)].map(([ran, runs]) => costOf(ran, runs))
  return {
    checks: [...checks].sort(byCpu),
    total: totalOf(within),
    unread: reading.unread,
    torn: reading.torn,
  }
}
