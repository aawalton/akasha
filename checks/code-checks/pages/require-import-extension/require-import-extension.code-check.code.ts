import { input, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { refusalsOver } from "./require-import-extension.code-check.decision.code.ts"

export const requireImportExtension = input(TEXTS, (change) => refusalsOver(change))
