import { shadowAt } from "@akasha/pages/shadow"
import {
  overEveryText,
  pageTypesFor,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { found, indexesAt } from "./no-index-path-spelled.code-check.decision.code.ts"

export function noIndexPathSpelled(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const under = indexesAt(shadow)
  const pageTypes = pageTypesFor(shadow)
  return overEveryText(root, (path, text) => found(under, pageTypes, path, text))
}
