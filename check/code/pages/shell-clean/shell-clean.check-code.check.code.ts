import {
  refusalsOver,
  shellNamed,
} from "akasha/check/code/pages/shell-clean/shell-clean.check-code.decision.code.ts"
import type {
  Body,
  Selector,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { FILES, input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const SHELLS: Selector<Body> = {
  named: "shell scripts",
  isInput: (path) => shellNamed(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => shellNamed(one.path)),
}

export const shellClean = input(SHELLS, refusalsOver)
