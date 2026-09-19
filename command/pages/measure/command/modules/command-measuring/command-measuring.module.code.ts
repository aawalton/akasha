import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  type CheckCost,
  type Chosen,
  type Costs,
  costOf,
  type Limits,
  latestOf,
  NO_LIMITS,
  type Run,
  rankedOf,
  runningOf,
  runsRead,
  totalOf,
  underRan,
  withinOf,
} from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { secondsIn } from "akasha/command/modules/stopping/command-stopping.module.code.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"

export const COMMAND = "command"

const NAMED = /\.command\.entries(?:\.part\d+)?\.uncommitted\.jsonl$/

const WALKED_PAST: ReadonlySet<string> = new Set(["node_modules", "dist", "target"])

const UNDER = "/"

export interface Reading {
  readonly runs: readonly Run[]
  readonly unread: readonly string[]
  readonly torn: readonly string[]
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
  const torn: string[] = []
  for (const at of foundIn(root, "")) {
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

function limitsFor(root: string, ran: string): Limits {
  const one = listedAt(root, COMMAND, ran)[0]
  if (one === undefined) return NO_LIMITS
  return { cpu: null, wall: secondsIn(valueByPath(root, one.path)), mem: null }
}

export function byWall(a: CheckCost, b: CheckCost): number {
  if (a.wall === null && b.wall === null) return a.check.localeCompare(b.check)
  if (a.wall === null) return 1
  if (b.wall === null) return -1
  return b.wall - a.wall || a.check.localeCompare(b.check)
}

export function costsIn(root: string, now: number, chosen: Chosen): Costs {
  const reading = heldIn(root)
  const held = reading.runs.filter((one) => one.phase === COMMAND)
  const within =
    chosen.by === "period"
      ? withinOf(held, now, chosen.ms)
      : runningOf(held, rankedOf(latestOf(held), chosen.runs))
  const checks = [...underRan(within)].map(([ran, runs]) => costOf(ran, runs, limitsFor(root, ran)))
  return {
    checks: [...checks].sort(byWall),
    total: totalOf(within),
    unread: reading.unread,
    torn: reading.torn,
  }
}
