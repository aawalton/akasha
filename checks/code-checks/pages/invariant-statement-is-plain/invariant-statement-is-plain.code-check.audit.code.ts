import { shadowAt } from "@akasha/pages/shadow"
import { overEveryTextAsync } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { found } from "./invariant-statement-is-plain.code-check.decision.code.ts"

export function invariantStatementIsPlain(root: string): Promise<readonly Judged[]> {
  const index = shadowAt(root).index
  return overEveryTextAsync(root, (path, text) => found(root, path, text, index))
}
