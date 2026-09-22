import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { gateFor } from "akasha/command/modules/gate-building/gate-building.module.code.ts"
import {
  commitAt,
  pathsIn,
} from "akasha/command/pages/deploy/modules/commit-naming/deploy-commit-naming.module.code.ts"
import {
  carriedWith,
  heldBackIn,
} from "akasha/command/pages/deploy/modules/file-closure/deploy-file-closure.module.code.ts"
import {
  bodyAt,
  readingEnded,
} from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const AT_DEPLOY = "deploy"

export function sinceCommit(root: string, held: string | null): string | null {
  return held === null ? null : commitAt(root, held)
}

export function changedBetween(root: string, was: string, now: string): readonly string[] {
  return pathsIn(said(root, ["diff", "--name-only", was, now]))
}

export function changeFrom(
  root: string,
  was: string | null,
  now: string,
  built: ReadonlySet<string>,
  also: readonly string[] = []
): Change {
  const at = (path: string) => bodyAt(root, now, path)
  if (was === null) {
    const changed = [...built]
    return { root, changed, carried: carriedWith(root, now, built, changed), before: at, after: at }
  }
  const moved = changedBetween(root, was, now).filter((one) => built.has(one))
  const changed = [...new Set([...moved, ...also])]
  return {
    root,
    changed,
    carried: carriedWith(root, now, built, changed),
    before: (path) => bodyAt(root, was, path),
    after: at,
  }
}

export function saidOfNoGate(slug: string, broken: string): string {
  return `the checks would not load, so nothing judged what \`${slug}\` is built from — ${broken}`
}

export function blamedIn(judged: readonly Judged[]): readonly Judged[] {
  return judged.filter((one) => one.slow !== true)
}

export function saidOf(judged: readonly Judged[]): readonly string[] {
  return blamedIn(judged).map((one) => `${one.path} — ${one.reason}`)
}

export type Judging = { readonly judged: readonly Judged[] } | { readonly broken: string }

export function saidOfUnproven(unproven: readonly string[]): string {
  return (
    "a workstation service is put up only where the test beside its page proves it runs, and " +
    `this commit holds no such test: ${unproven.join(", ")}`
  )
}

export function saidOfHeldBack(held: readonly string[]): string {
  return (
    "every other service was put up, and these were left running what they ran, being built " +
    `from what a check refused: ${held.join(", ")}`
  )
}

export type Judgement = {
  readonly why: readonly string[]
  readonly heldBack: ReadonlySet<string> | null
}

const REFUSES_EVERY: ReadonlySet<string> | null = null

export async function judgementOf(
  root: string,
  slug: string,
  was: string | null,
  now: string,
  built: ReadonlySet<string>,
  proving: readonly string[],
  closures: ReadonlyMap<string, ReadonlySet<string>> | null
): Promise<Judgement> {
  const unproven = proving.filter((one) => !built.has(one))
  if (unproven.length > 0) return { why: [saidOfUnproven(unproven)], heldBack: REFUSES_EVERY }
  const judging = await judgedOnDeploy(root, slug, was, now, built, proving)
  if ("broken" in judging) return { why: [judging.broken], heldBack: REFUSES_EVERY }
  const why = saidOf(judging.judged)
  if (why.length === 0) return { why, heldBack: new Set<string>() }
  if (closures === null) return { why, heldBack: REFUSES_EVERY }
  return {
    why,
    heldBack: heldBackIn(
      closures,
      judging.judged.map((one) => one.path)
    ),
  }
}

async function judgedOnDeploy(
  root: string,
  slug: string,
  was: string | null,
  now: string,
  built: ReadonlySet<string>,
  also: readonly string[] = []
): Promise<Judging> {
  try {
    const change = changeFrom(root, was, now, built, also)
    if (change.changed.length === 0) return { judged: [] }
    const gate = await gateFor(root, AT_DEPLOY)
    if (!("gate" in gate)) return { broken: saidOfNoGate(slug, gate.broken) }
    return { judged: blamedIn(await gate.gate.over(change)) }
  } finally {
    readingEnded()
  }
}
