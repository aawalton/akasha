import {
  refusalsOver,
  testedBeside,
} from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.code.ts"
import type {
  Selector,
  Text,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const TESTED: Selector<Text> = {
  named: "texts a test stands beside",
  isInput: testedBeside,
  from: (change, shadow) =>
    TEXTS.from(change, shadow).filter((one) => testedBeside(one.path, shadow)),
}

export const testsPass = input(TESTED, refusalsOver)
