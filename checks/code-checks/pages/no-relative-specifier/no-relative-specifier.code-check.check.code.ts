import { input, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { refusalsOver } from "./no-relative-specifier.code-check.decision.code.ts"

export const noRelativeSpecifier = input(TEXTS, (change) => refusalsOver(change))
