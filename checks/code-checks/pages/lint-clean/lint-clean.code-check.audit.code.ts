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
import { lintedOver } from "akasha/code-system/code-lint/code-lint.module.code.ts"

const TREE = "the tree this audit read"

export function lintClean(root: string): readonly Judged[] {
  const change = everythingIn(root)
  const said = change.after(CONFIG)
  const first = namedIn(change.changed, readsIn(said), skippedIn(said))[0]
  if (first === undefined) return []
  return judgedOf(lintedOver(root, HERE), first, root, TREE)
}
