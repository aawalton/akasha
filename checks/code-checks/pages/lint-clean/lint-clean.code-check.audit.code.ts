import {
  CONFIG,
  HERE,
  judgedOf,
  namedIn,
  readsIn,
  skippedIn,
} from "akasha/checks/code-checks/pages/lint-clean/lint-clean.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { lintedOver } from "akasha/code/lint/code-lint.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { pagesUnder } from "akasha/pages/service/page-composing/page-composing.module.code.ts"

const TREE = "the tree this audit read"

const PAGE_TYPE = "page-type"

const MORTAL = "mortal"

const PLURAL = "pluralSlug"

export type Mortalling = (root: string) => readonly string[]

export type Reading = {
  readonly mortal?: Mortalling
}

export const mortalling: Mortalling = (root) => {
  const found = new Set<string>()
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    const held = one.value as Record<string, unknown>
    const plural = held[PLURAL]
    if (held[MORTAL] !== true || typeof plural !== "string" || plural === "") continue
    found.add(pagesUnder(one.path, plural))
  }
  return [...found].sort()
}

export function lintClean(root: string, given: Reading = {}): readonly Judged[] {
  const change = everythingIn(root)
  const said = change.after(CONFIG)
  const skips = [...skippedIn(said), ...(given.mortal ?? mortalling)(root)]
  const first = namedIn(change.changed, readsIn(said), skips)[0]
  if (first === undefined) return []
  return judgedOf(lintedOver(root, HERE), first, root, TREE, skips)
}
