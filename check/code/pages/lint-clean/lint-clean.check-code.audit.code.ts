import {
  CONFIG,
  HERE,
  judgedOf,
  namedIn,
  readsIn,
  skippedIn,
} from "akasha/check/code/pages/lint-clean/lint-clean.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { lintedOver } from "akasha/code/running/modules/code-lint/code-lint.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { pagesUnder } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TREE = "the tree this audit read"

const PAGE_TYPE = "page-type"

const MORTAL = "mortal"

export type Mortalling = (root: string) => readonly string[]

export type Reading = {
  readonly mortal?: Mortalling
}

export const mortalling: Mortalling = (root) => {
  const found = new Set<string>()
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    if ((one.value as Record<string, unknown>)[MORTAL] !== true) continue
    found.add(pagesUnder(one.path))
  }
  return [...found].sort()
}

export function lintClean(root: string, given: Reading = {}): readonly Judged[] {
  const commit = commitIn(root)
  const said = commit.read(CONFIG)
  const skips = [...skippedIn(said), ...(given.mortal ?? mortalling)(root)]
  const first = namedIn(commit.paths, readsIn(said), skips)[0]
  if (first === undefined) return []
  return judgedOf(lintedOver(commit.root, HERE), first, commit.root, TREE, skips)
}
