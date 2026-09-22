import { refusalsOver } from "akasha/check/code/pages/manifest-names-what-is-reached/manifest-names-what-is-reached.check-code.decision.code.ts"
import {
  FILES,
  input,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const judged = change.changed.filter((path) => change.after(path) !== null)
  return refusalsOver(
    (path) => textIn(change, path),
    shadow,
    judged,
    () => shadow.listed()
  )
}

export const manifestNamesWhatIsReached = input(FILES, refusalsIn)
