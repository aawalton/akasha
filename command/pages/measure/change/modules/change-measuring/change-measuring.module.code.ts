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
import {
  cpuAllowedIn,
  memoryAllowedIn,
} from "akasha/command/modules/change-ceiling/change-ceiling.module.code.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"

export const CHANGE = "change"

const APPLY = "apply"

const ENTRIES = "entries"

const COMMAND = "command"

const CHANGED = "change-agent"

function limitsFor(root: string, ran: string): Limits {
  const one = listedAt(root, CHANGED, ran)[0]
  if (one === undefined) return NO_LIMITS
  const value = valueByPath(root, one.path)
  return { cpu: cpuAllowedIn(value), wall: null, mem: memoryAllowedIn(value) }
}

const APPLY_SLUG = "change-apply"

export function pagesIn(root: string): readonly string[] {
  return listedAt(root, COMMAND, APPLY_SLUG).map((one) => one.path)
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
  const checks = [...underRan(within)].map(([ran, runs]) => costOf(ran, runs, limitsFor(root, ran)))
  return {
    checks: [...checks].sort(byCpu),
    total: totalOf(within),
    unread: reading.unread,
    torn: reading.torn,
  }
}
