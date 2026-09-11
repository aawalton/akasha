import { refusalsOver } from "akasha/checks/code-checks/pages/specifier-names-a-package/specifier-names-a-package.code-check.decision.code.ts"
import { FILES, input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const specifierNamesAPackage = input(FILES, refusalsOver)
