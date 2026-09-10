import type { Selector, Text } from "../../../modules/change-walking/change-walking.module.code.ts"
import { judgingEach, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { moduleAt, reasonsIn } from "./no-global-in-a-module.code-check.decision.code.ts"

const MODULES: Selector<Text> = {
  named: "the modules akasha compiles",
  isInput: (path) => moduleAt(path),
  from: (change, shadow) => TEXTS.from(change, shadow).filter((one) => moduleAt(one.path)),
}

export const noGlobalInAModule = judgingEach(MODULES, (given) => reasonsIn(given.path, given.text))
