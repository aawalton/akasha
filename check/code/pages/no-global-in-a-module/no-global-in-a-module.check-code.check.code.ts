import {
  moduleAt,
  reasonsIn,
} from "akasha/check/code/pages/no-global-in-a-module/no-global-in-a-module.check-code.decision.code.ts"
import {
  judgingEach,
  textsBy,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const MODULES = textsBy("the modules akasha compiles", (path) => moduleAt(path))

export const noGlobalInAModule = judgingEach(MODULES, (given) => reasonsIn(given.path, given.text))
