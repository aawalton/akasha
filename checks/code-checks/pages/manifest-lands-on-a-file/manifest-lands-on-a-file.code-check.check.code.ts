import {
  type Asking,
  refusalsOver,
} from "akasha/checks/code-checks/pages/manifest-lands-on-a-file/manifest-lands-on-a-file.code-check.decision.code.ts"
import { manifestsIn } from "akasha/checks/code-checks/pages/package-reached-where-named/package-reached-where-named.code-check.decision.code.ts"
import {
  FILES,
  input,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

export function askingIn(change: Change): Asking {
  return {
    textAt: (path) => textIn(change, path),
    there: (path) => change.after(path) !== null,
  }
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  return refusalsOver(manifestsIn(shadow), askingIn(change))
}

export const manifestLandsOnAFile = input(FILES, refusalsIn)
