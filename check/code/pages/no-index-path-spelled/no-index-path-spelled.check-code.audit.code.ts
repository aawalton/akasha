import {
  found,
  indexAt,
} from "akasha/check/code/pages/no-index-path-spelled/no-index-path-spelled.check-code.decision.code.ts"
import {
  overEveryText,
  pageTypesFor,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function noIndexPathSpelled(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const under = indexAt(shadow)
  const pageTypes = pageTypesFor(shadow)
  return overEveryText(root, (path, text) => found(under, pageTypes, path, text))
}
