import type { Selector, Text } from "../../../modules/change-walking/change-walking.module.code.ts"
import { input, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { refusalsOver, testedBeside } from "./tests-pass.code-check.decision.code.ts"

const TESTED: Selector<Text> = {
  named: "texts a test stands beside",
  isInput: testedBeside,
  from: (change, shadow) =>
    TEXTS.from(change, shadow).filter((one) => testedBeside(one.path, shadow)),
}

export const testsPass = input(TESTED, refusalsOver)
