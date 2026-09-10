import type { Body, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, inputAsync } from "../../../modules/change-walking/change-walking.module.code.ts"
import { builtFrom, refusalsOver } from "./typecheck.code-check.decision.code.ts"

const BUILT: Selector<Body> = {
  named: "the bodies the program is built from",
  isInput: (path) => builtFrom(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => builtFrom(one.path)),
}

export const typecheck = inputAsync(BUILT, refusalsOver)
