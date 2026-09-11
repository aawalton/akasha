import {
  type Drifted,
  judgedIn,
} from "akasha/checks/code-checks/pages/index-is-level-with-the-pages/index-is-level-with-the-pages.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { refreshedWhole } from "akasha/pages/indexes/indexing/indexing.module.code.ts"

export type Reconciling = (root: string) => Drifted

export const reconciling: Reconciling = (root) => refreshedWhole(root, root, false).drift

export function indexIsLevelWithThePages(
  root: string,
  read: Reconciling = reconciling
): readonly Judged[] {
  return judgedIn(read(root))
}
