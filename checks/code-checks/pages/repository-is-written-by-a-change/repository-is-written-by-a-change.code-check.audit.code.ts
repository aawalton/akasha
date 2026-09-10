import { shadowAt } from "@akasha/pages/shadow"
import { overEveryNamed } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  outsideBy,
  reasonsOf,
} from "./repository-is-written-by-a-change.code-check.decision.code.ts"

export function repositoryIsWrittenByAChange(root: string): readonly Judged[] {
  return overEveryNamed(root, outsideBy(shadowAt(root)), reasonsOf(root))
}
