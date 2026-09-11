import { judgedIn } from "akasha/checks/code-checks/pages/no-raw-nul-bytes/no-raw-nul-bytes.code-check.decision.code.ts"
import {
  everythingIn,
  overEachFile,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function noRawNulBytes(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEachFile(everythingIn(root), (given) => judgedIn(given, shadow))
}
