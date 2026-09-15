import { refusalsOver } from "akasha/check/code/pages/require-import-extension/require-import-extension.check-code.decision.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const requireImportExtension = input(TEXTS, (change) => refusalsOver(change))
