import { found } from "akasha/check/code/pages/decision-statement-is-plain/decision-statement-is-plain.check-code.decision.code.ts"
import { overEveryTextAsync } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function decisionStatementIsPlain(root: string): Promise<readonly Judged[]> {
  const index = shadowAt(root).index
  return overEveryTextAsync(root, (path, text) => found(root, path, text, index))
}
