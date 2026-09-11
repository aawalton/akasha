import { found } from "akasha/checks/code-checks/pages/invariant-statement-is-plain/invariant-statement-is-plain.code-check.decision.code.ts"
import { overEveryTextAsync } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function invariantStatementIsPlain(root: string): Promise<readonly Judged[]> {
  const index = shadowAt(root).index
  return overEveryTextAsync(root, (path, text) => found(root, path, text, index))
}
