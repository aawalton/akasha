import {
  refusalsOver,
  shellNamed,
} from "akasha/check/code/pages/shell-clean/shell-clean.check-code.decision.code.ts"
import { filesBy, input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const SHELLS = filesBy("shell scripts", shellNamed)

export const shellClean = input(SHELLS, refusalsOver)
