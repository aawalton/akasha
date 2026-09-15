import {
  builtFrom,
  refusalsOver,
} from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.code.ts"
import {
  filesBy,
  inputAsync,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const BUILT = filesBy("the bodies the program is built from", (path) => builtFrom(path))

export const typecheck = inputAsync(BUILT, refusalsOver)
