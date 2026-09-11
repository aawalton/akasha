import {
  found,
  indexesAt,
} from "akasha/checks/code-checks/pages/no-index-path-spelled/no-index-path-spelled.code-check.decision.code.ts"
import {
  overEveryText,
  pageTypesFor,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function noIndexPathSpelled(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const under = indexesAt(shadow)
  const pageTypes = pageTypesFor(shadow)
  return overEveryText(root, (path, text) => found(under, pageTypes, path, text))
}
