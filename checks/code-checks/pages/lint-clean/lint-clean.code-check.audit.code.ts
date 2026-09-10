import { lintedOver } from "@akasha/code/code-lint"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  CONFIG,
  carriedIn,
  judgedOf,
  readsIn,
  skippedIn,
} from "./lint-clean.code-check.decision.code.ts"

const TREE = "the tree this audit read"

export function lintClean(root: string): readonly Judged[] {
  const change = everythingIn(root)
  const said = change.after(CONFIG)
  const carried = carriedIn(change, readsIn(said), skippedIn(said))
  const first = carried[0]
  if (first === undefined) return []
  return judgedOf(lintedOver(root, carried), first, root, TREE)
}
