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
  runsIn,
  totalOf,
  underRan,
  withinOf,
} from "../../../../modules/check-measuring/check-measuring.module.code.ts"

export const CHANGE = "change"

export const APPLY = "apply"

export const PAGES: readonly string[] = [
  "commands/pages/change-draft/change-draft.command.ts",
  "commands/pages/change-apply/change-apply.command.ts",
]

export interface Reading {
  readonly runs: readonly Run[]
  readonly unread: readonly string[]
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
