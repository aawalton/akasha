import { type Reading, reachOf } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import type { Run } from "akasha/command/modules/long-body/long-body.module.code.ts"
import {
  linesOf,
  moreCall,
  runFrom,
  runLines,
  tooWide,
} from "akasha/command/modules/long-body/long-body.module.code.ts"

type Longing = {
  readonly calledAs: string
  readonly named: string
  readonly text: string
  readonly after: number
  readonly budget: number
}

type Longed = {
  readonly lines: readonly string[]
  readonly run: Run | null
  readonly refusal: string | null
}

export function longAnswer(one: Longing): Longed {
  const lines = linesOf(one.text)
  const run = runFrom(lines, one.after, one.budget)
  if (run === null) {
    return { lines: [], run: null, refusal: tooWide(one.named, lines, one.after, one.budget) }
  }
  const said = [...runLines(one.named, run), ...moreCall(one.calledAs, one.named, run)]
  return { lines: said, run, refusal: null }
}

export function reachedTo(run: Run): number | null {
  return run.through === run.of ? null : run.through
}

export function afterIn(seen: Reading | null, oid: string): number {
  return seen !== null && seen.oid === oid ? (reachOf(seen.readThrough) ?? 0) : 0
}

export function budgetFor(ceiling: number, spent: number, away: number): number {
  return Math.max(ceiling - spent - away, 0)
}
