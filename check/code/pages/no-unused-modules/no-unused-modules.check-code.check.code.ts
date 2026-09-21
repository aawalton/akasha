import { MODULE } from "akasha/check/code/pages/no-unused-modules/modules/module-gathering/module-gathering.module.code.ts"
import { refusalsOver } from "akasha/check/code/pages/no-unused-modules/no-unused-modules.check-code.decision.code.ts"
import {
  input,
  type Selector,
  type Text,
  textsBy,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const MODULE_FILES: Selector<Text> = textsBy(
  "a module's page and the files beside it",
  (path) => partedIn(path)?.pageType === MODULE
)

export const noUnusedModules = input(MODULE_FILES, refusalsOver)
