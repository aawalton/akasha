import {
  judgingBy,
  kindsFor,
  namedAt,
} from "akasha/checks/code-checks/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { everyPath } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { shadowAt } from "akasha/pages/modules/shadow/shadow.module.code.ts"
import { textAt } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

export function commandIsInTheRightFolder(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const kinds = kindsFor(shadow)
  const judging = judgingBy(shadow, kinds)
  const said: Judged[] = []
  for (const path of everyPath(root)) {
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
