import { refusalsOver } from "akasha/checks/code-checks/pages/name-format-judges-by-one-shape/name-format-judges-by-one-shape.code-check.decision.code.ts"
import { FILES, input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const nameFormatJudgesByOneShape = input(FILES, refusalsOver)
