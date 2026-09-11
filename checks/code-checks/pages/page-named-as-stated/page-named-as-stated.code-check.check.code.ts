import { refusalsOver } from "akasha/checks/code-checks/pages/page-named-as-stated/page-named-as-stated.code-check.decision.code.ts"
import { FILES, input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const pageNamedAsStated = input(FILES, refusalsOver)
