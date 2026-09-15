import {
  moduleAt,
  reasonsIn,
} from "akasha/check/code/pages/no-global-in-a-module/no-global-in-a-module.check-code.decision.code.ts"
import type {
  Selector,
  Text,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const MODULES: Selector<Text> = {
  named: "the modules akasha compiles",
  isInput: (path) => moduleAt(path),
  from: (change, shadow) => TEXTS.from(change, shadow).filter((one) => moduleAt(one.path)),
}

export const noGlobalInAModule = judgingEach(MODULES, (given) => reasonsIn(given.path, given.text))
