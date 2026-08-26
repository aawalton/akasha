import { relative } from "node:path"
import { sweep } from "../../cache/answer.ts"
import { closureOf } from "../../cache/closure.ts"
import {
  entryOf,
  keepOutcome,
  keptOutcome,
  OUTCOME_KIND,
  outcomeKeyOf,
  outcomeMarkOf,
} from "../../cache/check-outcome.ts"
import { KEEP_KIND, keepUnder } from "../../cache/keep.ts"
import { oidOfBody } from "../../cache/oid.ts"
import type { Act, Check, CheckFailure, CheckRun, Tree } from "../check-shape.ts"
import { type Held, runAll } from "./all.ts"
import { outcomesOf } from "./outcome.ts"

export type Subject = {
  readonly at: string
  readonly oid: string
}

export type Setting = {
  readonly act: Act | null
  readonly trial: boolean
}

function answerless(check: Check): boolean {
  return check.needs === "tree" || check.needsAuthor === true
}

function under(check: Check, tree: Tree, subject: Subject): string {
  if (check.needs !== "path") return subject.oid
  return oidOfBody(tree.root, Buffer.from(relative(tree.root, subject.at)))
}

export function runKept(
  check: Check,
  subjects: readonly Subject[],
  runtime: string,
  answers: string,
  tree: Tree,
  setting: Setting
): CheckRun {
  const closure = closureOf(tree.root, entryOf(check.slug))
  const mark = outcomeMarkOf(check.slug, runtime, closure)
  sweep(answers, OUTCOME_KIND, check.slug, mark)
  sweep(answers, KEEP_KIND, check.slug, mark)
  const kept = keepUnder(answers, check.slug, mark, setting.trial)
  const held: Held = { act: setting.act, keep: kept.keep }
  try {
    if (answerless(check)) {
      const every = subjects.map((one) => one.at)
      return runAll([check], every, tree, held)[0] ?? { slug: check.slug, failures: [] }
    }
    const failures: CheckFailure[] = []
    const missed: string[] = []
    const named = new Map<string, string>()
    for (const subject of subjects) {
      const at = under(check, tree, subject)
      named.set(subject.at, at)
      const answer = keptOutcome(answers, outcomeKeyOf(check.slug, mark, at), subject.at)
      if (answer === null) {
        missed.push(subject.at)
        continue
      }
      for (const reason of answer.reasons) failures.push({ path: subject.at, reason })
    }
    if (missed.length === 0) return { slug: check.slug, failures }
    const ran = runAll([check], missed, tree, held)[0]
    if (ran === undefined) return { slug: check.slug, failures }
    if ("threw" in ran) return ran
    for (const outcome of outcomesOf(ran, missed)) {
      const at = named.get(outcome.path)
      if (at !== undefined) keepOutcome(answers, outcomeKeyOf(check.slug, mark, at), outcome)
      for (const reason of outcome.reasons) failures.push({ path: outcome.path, reason })
    }
    return { slug: check.slug, failures }
  } finally {
    kept.done()
  }
}
