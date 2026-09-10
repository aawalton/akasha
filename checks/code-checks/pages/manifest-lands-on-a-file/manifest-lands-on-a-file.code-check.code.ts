import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { FILES, input, textIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { manifestsIn } from "../package-reached-where-named/package-reached-where-named.code-check.code.ts"
import { type Asking, refusalsOver } from "./manifest-lands-on-a-file.code-check.decision.code.ts"

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
