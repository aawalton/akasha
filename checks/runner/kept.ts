import { sweep } from "../../cache/answer.ts"
import {
  keepOutcome,
  keptOutcome,
  OUTCOME_KIND,
  outcomeKeyOf,
  outcomeMarkOf,
} from "../../cache/check-outcome.ts"
import type { Input } from "../../cache/mark.ts"
import type { Check, CheckFailure, CheckRun } from "../check-shape.ts"
import { runAll } from "./all.ts"
import { outcomesOf } from "./outcome.ts"

export type Subject = {
  readonly at: string
  readonly oid: string
}

export function runKept(
  check: Check,
  subjects: readonly Subject[],
  closure: readonly Input[],
  runtime: string,
  answers: string
): CheckRun {
  const mark = outcomeMarkOf(check.slug, runtime, closure)
  sweep(answers, OUTCOME_KIND, check.slug, mark)
  const failures: CheckFailure[] = []
  const missed: string[] = []
  const oidAt = new Map<string, string>()
  for (const subject of subjects) {
    oidAt.set(subject.at, subject.oid)
    const held = keptOutcome(answers, outcomeKeyOf(check.slug, mark, subject.oid), subject.at)
    if (held === null) {
      missed.push(subject.at)
      continue
    }
    for (const reason of held.reasons) failures.push({ path: subject.at, reason })
  }
  if (missed.length === 0) return { slug: check.slug, failures }
  const ran = runAll([check], missed)[0]
  if (ran === undefined) return { slug: check.slug, failures }
  if ("threw" in ran) return ran
  for (const outcome of outcomesOf(ran, missed)) {
    const oid = oidAt.get(outcome.path)
    if (oid !== undefined) keepOutcome(answers, outcomeKeyOf(check.slug, mark, oid), outcome)
    for (const reason of outcome.reasons) failures.push({ path: outcome.path, reason })
  }
  return { slug: check.slug, failures }
}
