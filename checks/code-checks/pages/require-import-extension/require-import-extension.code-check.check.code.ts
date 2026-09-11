import { refusalsOver } from "akasha/checks/code-checks/pages/require-import-extension/require-import-extension.code-check.decision.code.ts"
import { input, TEXTS } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const requireImportExtension = input(TEXTS, (change) => refusalsOver(change))
