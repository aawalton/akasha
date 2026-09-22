import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { gateFor } from "akasha/command/modules/gate-building/gate-building.module.code.ts"
import {
  commitAt,
  pathsIn,
} from "akasha/command/pages/deploy/modules/commit-naming/deploy-commit-naming.module.code.ts"
import { carriedWith } from "akasha/command/pages/deploy/modules/file-closure/deploy-file-closure.module.code.ts"
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

export async function judgedOnDeploy(
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
