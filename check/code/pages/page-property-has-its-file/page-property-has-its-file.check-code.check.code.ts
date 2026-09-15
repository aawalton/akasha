import { refusalsOver } from "akasha/check/code/pages/page-property-has-its-file/page-property-has-its-file.check-code.decision.code.ts"
import { FILES, input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const pagePropertyHasItsFile = input(FILES, refusalsOver)
