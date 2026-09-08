import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { uncommittedPartsOf } from "../../../../pages/file-parts/page-file-parts.module.code.ts"
import {
  byCpu,
  type Chosen,
  type Costs,
  costOf,
  latestOf,
  type Run,
  rankedOf,
  runningOf,
  runsIn,
  totalOf,
  withinOf,
} from "../check-measuring/check-measuring.module.code.ts"

const ENTRIES = "entries"

const HELD = "jsonl"

export const CHANGE = "change"

export const APPLY = "apply"

export const PAGES: readonly string[] = [
  "commands/pages/change/change.command.ts",
  "commands/pages/apply/apply.command.ts",
]

export interface Reading {
  readonly runs: readonly Run[]
  readonly unread: readonly string[]
}

export function partsIn(root: string, page: string): readonly string[] {
  const there = (at: string): boolean => existsSync(join(root, at))
  return uncommittedPartsOf(page, ENTRIES, HELD, there).filter(there)
}

export function heldIn(root: string): Reading {
  const runs: Run[] = []
  const unread: string[] = []
  for (const page of PAGES) {
    for (const at of partsIn(root, page)) {
      try {
        for (const one of runsIn(readFileSync(join(root, at), "utf8"))) runs.push(one)
      } catch {
        unread.push(at)
      }
    }
  }
  return { runs, unread }
}

export function underRan(runs: readonly Run[]): ReadonlyMap<string, readonly Run[]> {
  const found = new Map<string, Run[]>()
  for (const one of runs) {
    const had = found.get(one.ran)
    if (had === undefined) found.set(one.ran, [one])
    else had.push(one)
  }
  return found
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
    other: [],
  }
}
