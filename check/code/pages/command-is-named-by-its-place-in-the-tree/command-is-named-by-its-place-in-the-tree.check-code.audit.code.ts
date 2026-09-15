import {
  judgingBy,
  type Kinds,
  kindsFor,
  namedAt,
} from "akasha/check/code/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { type Shadow, shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

function pagesOfKinds(shadow: Shadow, kinds: Kinds): readonly string[] {
  const found = new Set<string>()
  for (const slug of [...kinds.tree, ...kinds.modules]) {
    for (const one of shadow.index.everyOfType(slug)) found.add(one.path)
  }
  return [...found].sort()
}

export function commandIsNamedByItsPlaceInTheTree(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const kinds = kindsFor(shadow)
  const judging = judgingBy(shadow, kinds)
  const said: Judged[] = []
  for (const path of pagesOfKinds(shadow, kinds)) {
    const one = namedAt(path, kinds)
    if (one === null) continue
    const value = shadow.pageOf(path)
    const id = value === null ? null : textAt(value, ID)
    if (id === null) continue
    const reason = judging(id, path, one)
    if (reason !== null) said.push({ path, reason })
  }
  return said
}
