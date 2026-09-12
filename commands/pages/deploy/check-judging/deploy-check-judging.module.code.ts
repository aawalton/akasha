import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { gateFor } from "akasha/commands/modules/gate-building/gate-building.module.code.ts"
import {
  commitAt,
  pathsIn,
} from "akasha/commands/pages/deploy/commit-naming/deploy-commit-naming.module.code.ts"
import { carriedWith } from "akasha/commands/pages/deploy/file-closure/deploy-file-closure.module.code.ts"
import { bodyAt, readingEnded } from "akasha/git/commit-reading/commit-reading.module.code.ts"
import { said } from "akasha/git/running/git-running.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"

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
  const carried = carriedWith(root, now, built)
  if (was === null) return { root, changed: [...built], carried, before: at, after: at }
  const moved = changedBetween(root, was, now).filter((one) => built.has(one))
  return {
    root,
    changed: [...new Set([...moved, ...also])],
    carried,
    before: (path) => bodyAt(root, was, path),
    after: at,
  }
}

export function saidOfNoGate(slug: string, broken: string): string {
  return `the checks would not load, so nothing judged what \`${slug}\` is built from — ${broken}`
}

export function saidOf(judged: readonly Judged[]): readonly string[] {
  return judged.map((one) => `${one.path} — ${one.reason}`)
}

export async function judgedOnDeploy(
  root: string,
  slug: string,
  was: string | null,
  now: string,
  built: ReadonlySet<string>,
  also: readonly string[] = []
): Promise<readonly string[]> {
  try {
    const change = changeFrom(root, was, now, built, also)
    if (change.changed.length === 0) return []
    const gate = gateFor(root, AT_DEPLOY)
    if (!("gate" in gate)) return [saidOfNoGate(slug, gate.broken)]
    return saidOf(await gate.gate.over(change))
  } finally {
    readingEnded()
  }
}
