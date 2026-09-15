import {
  type Asking,
  refusalsOver,
} from "akasha/check/code/pages/manifest-lands-on-a-file/manifest-lands-on-a-file.check-code.decision.code.ts"
import {
  FILES,
  input,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { manifestsIn } from "akasha/code/workspace/modules/manifest-finding/manifest-finding.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

function askingIn(change: Change): Asking {
  return {
    textAt: (path) => textIn(change, path),
    there: (path) => change.after(path) !== null,
  }
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  return refusalsOver(manifestsIn(shadow), askingIn(change))
}

export const manifestLandsOnAFile = input(FILES, refusalsIn)
