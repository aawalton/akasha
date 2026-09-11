import {
  refusalsOver,
  shellNamed,
} from "akasha/checks/code-checks/pages/shell-clean/shell-clean.code-check.decision.code.ts"
import type {
  Body,
  Selector,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { FILES, input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

const SHELLS: Selector<Body> = {
  named: "shell scripts",
  isInput: (path) => shellNamed(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => shellNamed(one.path)),
}

export const shellClean = input(SHELLS, refusalsOver)
