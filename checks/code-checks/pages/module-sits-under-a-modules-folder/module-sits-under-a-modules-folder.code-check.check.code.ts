import { refusalsOver } from "akasha/checks/code-checks/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.code-check.decision.code.ts"
import { input, TEXTS } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const moduleSitsUnderAModulesFolder = input(TEXTS, (change) => refusalsOver(change))
