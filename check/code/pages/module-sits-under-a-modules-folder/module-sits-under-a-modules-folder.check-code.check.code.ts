import { refusalsOver } from "akasha/check/code/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.check-code.decision.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const moduleSitsUnderAModulesFolder = input(TEXTS, (change) => refusalsOver(change))
