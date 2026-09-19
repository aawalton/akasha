import { testedBeside } from "akasha/check/code/pages/tests-pass/modules/run-naming/run-naming.module.code.ts"
import { refusalsOver } from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.code.ts"
import {
  inputAsync,
  textsBy,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const TESTED = textsBy("texts a test sits beside", testedBeside)

export const testsPass = inputAsync(TESTED, refusalsOver)
