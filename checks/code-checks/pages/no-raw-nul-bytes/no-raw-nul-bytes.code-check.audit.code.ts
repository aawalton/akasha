import { shadowAt } from "@akasha/pages/shadow"
import {
  everythingIn,
  overEachFile,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { judgedIn } from "./no-raw-nul-bytes.code-check.decision.code.ts"

export function noRawNulBytes(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEachFile(everythingIn(root), (given) => judgedIn(given, shadow))
}
