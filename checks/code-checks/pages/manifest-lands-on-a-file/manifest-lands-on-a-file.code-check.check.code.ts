import {
  type Asking,
  refusalsOver,
} from "akasha/checks/code-checks/pages/manifest-lands-on-a-file/manifest-lands-on-a-file.code-check.decision.code.ts"
import {
  FILES,
  input,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { manifestsIn } from "akasha/code/workspaces/modules/manifest-finding/manifest-finding.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"

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
