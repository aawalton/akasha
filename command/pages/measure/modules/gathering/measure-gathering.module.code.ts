import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  byCpu,
  type Chosen,
  type Costs,
  costOf,
  type Limits,
  latestOf,
  NO_LIMITS,
  partsIn,
  type Run,
  rankedOf,
  runningOf,
  runsRead,
  totalOf,
  underRan,
  withinOf,
} from "akasha/check/modules/measuring/check-measuring.module.code.ts"

const ENTRIES = "entries"

interface Gathered {
  readonly runs: readonly Run[]
  readonly unread: readonly string[]
  readonly torn: readonly string[]
}

export function readIn(root: string, files: readonly string[]): Gathered {
  const runs: Run[] = []
  const unread: string[] = []
  const torn: string[] = []
  for (const at of files) {
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
  return { runs, unread, torn }
}

export function besideIn(root: string, pages: readonly string[]): Gathered {
  return readIn(
    root,
    pages.flatMap((one) => partsIn(root, one, ENTRIES))
  )
}

export function costsOf(
  gathered: Gathered,
  now: number,
  chosen: Chosen,
  keeping: (one: Run) => boolean,
  limits: Limits = NO_LIMITS
): Costs {
  const held = gathered.runs.filter(keeping)
  const within =
    chosen.by === "period"
      ? withinOf(held, now, chosen.ms)
      : runningOf(held, rankedOf(latestOf(held), chosen.runs))
  const rows = [...underRan(within)].map(([ran, runs]) => costOf(ran, runs, limits))
  return {
    checks: [...rows].sort(byCpu),
    total: totalOf(within),
    unread: gathered.unread,
    torn: gathered.torn,
  }
}
