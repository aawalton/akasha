import { relative } from "node:path"
import { forget, sweep } from "../../cache/cache.ts"
import { closureOf } from "../../cache/closure/closure.ts"
import type { BuildContext } from "../../graph/build-context/build-context.ts"
import {
  cacheOutcome,
  cachedOutcome,
  entryOf,
  OUTCOME_KIND,
  outcomeKeyOf,
  outcomeMarkOf,
} from "../../cache/outcome/outcome.ts"
import { KEEP_KIND, keepUnder } from "../../cache/keep/keep.ts"
import { oidOfBody } from "../../repo/oid/oid.ts"
import type { Act, Check, CheckFailure, CheckRun, Tree } from "../check/check-shape.ts"
import { type Held, runAll } from "./all.ts"
import { outcomesOf } from "./outcome.ts"

export type Subject = {
  readonly at: string
  readonly oid: string
}

export type Setting = {
  readonly act: Act | null
  readonly before: Tree | null
  readonly trial: boolean
  readonly oids: ReadonlyMap<string, string>
  readonly ctx: BuildContext
}

function uncached(check: Check): boolean {
  return check.needs === "tree" || check.needsAuthor === true || check.cached === false
}

function under(check: Check, tree: Tree, subject: Subject): string {
  if (check.needs !== "path") return subject.oid
  return oidOfBody(Buffer.from(relative(tree.root, subject.at)))
}

export function forgetRetired(answers: string, registry: readonly Check[]): void {
  const live = registry.map((one) => one.slug)
  forget(answers, OUTCOME_KIND, live)
  forget(answers, KEEP_KIND, live)
}

export function runKept(
  check: Check,
  subjects: readonly Subject[],
  runtime: string,
  answers: string,
  tree: Tree,
  setting: Setting
): CheckRun {
  const closure = closureOf(setting.ctx, entryOf(check.slug), setting.oids)
  const mark = outcomeMarkOf(check.slug, runtime, closure)
  sweep(answers, OUTCOME_KIND, check.slug, mark)
  sweep(answers, KEEP_KIND, check.slug, mark)
  const kept = keepUnder(answers, check.slug, mark, setting.trial)
  const held: Held = { act: setting.act, before: setting.before, keep: kept.keep }
  try {
    if (uncached(check)) {
      const every = subjects.map((one) => one.at)
      return runAll([check], every, tree, held)[0] ?? { slug: check.slug, failures: [] }
    }
    const failures: CheckFailure[] = []
    const missed: string[] = []
    const named = new Map<string, string>()
    for (const subject of subjects) {
      const at = under(check, tree, subject)
      named.set(subject.at, at)
      const answer = cachedOutcome(answers, outcomeKeyOf(check.slug, mark, at), subject.at)
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
      if (at !== undefined) cacheOutcome(answers, outcomeKeyOf(check.slug, mark, at), outcome)
      for (const reason of outcome.reasons) failures.push({ path: outcome.path, reason })
    }
    return { slug: check.slug, failures }
  } finally {
    kept.done()
  }
}
