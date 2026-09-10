import type { Body, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, input } from "../../../modules/change-walking/change-walking.module.code.ts"
import { refusalsOver, shellNamed } from "./shell-clean.code-check.decision.code.ts"

const SHELLS: Selector<Body> = {
  named: "shell scripts",
  isInput: (path) => shellNamed(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => shellNamed(one.path)),
}

export const shellClean = input(SHELLS, refusalsOver)
