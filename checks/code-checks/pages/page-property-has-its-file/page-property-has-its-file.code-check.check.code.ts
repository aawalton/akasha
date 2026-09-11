import { refusalsOver } from "akasha/checks/code-checks/pages/page-property-has-its-file/page-property-has-its-file.code-check.decision.code.ts"
import { FILES, input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const pagePropertyHasItsFile = input(FILES, refusalsOver)
