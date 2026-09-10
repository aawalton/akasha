import { shadowAt } from "@akasha/pages/shadow"
import {
  bodyOf,
  everythingIn,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { found } from "./invariant-statement-is-plain.code-check.decision.code.ts"

export async function invariantStatementIsPlain(root: string): Promise<readonly Judged[]> {
  const index = shadowAt(root).index
  const change = everythingIn(root)
  const said: Judged[] = []
  for (const path of change.changed) {
    if (!textNamed(path)) continue
    const bytes = change.after(path)
    if (bytes === null) continue
    const text = bodyOf({ root, path, bytes })
    for (const reason of await found(root, path, text, index)) said.push({ path, reason })
  }
  return said
}
