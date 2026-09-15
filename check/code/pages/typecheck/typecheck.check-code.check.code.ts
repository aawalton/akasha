import {
  builtFrom,
  refusalsOver,
} from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.code.ts"
import type {
  Body,
  Selector,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  FILES,
  inputAsync,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const BUILT: Selector<Body> = {
  named: "the bodies the program is built from",
  isInput: (path) => builtFrom(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => builtFrom(one.path)),
}

export const typecheck = inputAsync(BUILT, refusalsOver)
