import { refusalsOver } from "akasha/checks/code-checks/pages/package-reached-where-named/package-reached-where-named.code-check.decision.code.ts"
import { FILES, input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const packageReachedWhereNamed = input(FILES, refusalsOver)
