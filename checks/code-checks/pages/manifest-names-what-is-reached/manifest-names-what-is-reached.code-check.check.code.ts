import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { FILES, input } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./manifest-names-what-is-reached.code-check.decision.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const judged = change.changed.filter((path) => change.after(path) !== null)
  return refusalsOver(change, shadow, judged)
}

export const manifestNamesWhatIsReached = input(FILES, refusalsIn)
