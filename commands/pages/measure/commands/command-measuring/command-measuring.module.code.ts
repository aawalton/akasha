import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
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
  underRan,
  withinOf,
} from "../../checks/check-measuring/check-measuring.module.code.ts"

export const COMMAND = "command"

const NAMED = /\.command\.entries(?:\.part\d+)?\.uncommitted\.jsonl$/

const WALKED_PAST: ReadonlySet<string> = new Set(["node_modules", "dist", "target"])

const UNDER = "/"

export interface Reading {
  readonly runs: readonly Run[]
  readonly unread: readonly string[]
}

export function foundIn(root: string, at: string): readonly string[] {
  let held: readonly { name: string; isDirectory: () => boolean }[]
  try {
    held = readdirSync(join(root, at), { withFileTypes: true })
  } catch {
    return []
  }
  const found: string[] = []
  for (const one of held) {
    const path = at === "" ? one.name : `${at}${UNDER}${one.name}`
    if (one.isDirectory()) {
      if (one.name.startsWith(".") || WALKED_PAST.has(one.name)) continue
      found.push(...foundIn(root, path))
      continue
    }
    if (NAMED.test(one.name)) found.push(path)
  }
  return found.sort()
}

export function heldIn(root: string): Reading {
  const runs: Run[] = []
  const unread: string[] = []
  for (const at of foundIn(root, "")) {
    try {
      for (const one of runsIn(readFileSync(join(root, at), "utf8"))) runs.push(one)
    } catch {
      unread.push(at)
    }
  }
  return { runs, unread }
}

export function costsIn(root: string, now: number, chosen: Chosen): Costs {
  const reading = heldIn(root)
  const held = reading.runs.filter((one) => one.phase === COMMAND)
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
