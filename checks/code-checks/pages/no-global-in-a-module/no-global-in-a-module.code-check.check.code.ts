import {
  moduleAt,
  reasonsIn,
} from "akasha/checks/code-checks/pages/no-global-in-a-module/no-global-in-a-module.code-check.decision.code.ts"
import type {
  Selector,
  Text,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

const MODULES: Selector<Text> = {
  named: "the modules akasha compiles",
  isInput: (path) => moduleAt(path),
  from: (change, shadow) => TEXTS.from(change, shadow).filter((one) => moduleAt(one.path)),
}

export const noGlobalInAModule = judgingEach(MODULES, (given) => reasonsIn(given.path, given.text))
