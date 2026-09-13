import { refusalsOver } from "akasha/checks/code-checks/pages/index-answers-are-level-with-the-change/index-answers-are-level-with-the-change.code-check.decision.code.ts"
import { FILES, input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const indexAnswersAreLevelWithTheChange = input(FILES, (change, shadow) =>
  refusalsOver(change, shadow)
)
