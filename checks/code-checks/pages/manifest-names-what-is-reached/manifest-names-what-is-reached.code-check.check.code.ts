import { refusalsOver } from "akasha/checks/code-checks/pages/manifest-names-what-is-reached/manifest-names-what-is-reached.code-check.decision.code.ts"
import { FILES, input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const judged = change.changed.filter((path) => change.after(path) !== null)
  return refusalsOver(change, shadow, judged)
}

export const manifestNamesWhatIsReached = input(FILES, refusalsIn)
