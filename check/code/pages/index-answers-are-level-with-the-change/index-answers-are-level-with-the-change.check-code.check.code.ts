import { refusalsOver } from "akasha/check/code/pages/index-answers-are-level-with-the-change/index-answers-are-level-with-the-change.check-code.decision.code.ts"
import { FILES, input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const indexAnswersAreLevelWithTheChange = input(FILES, (change, shadow) =>
  refusalsOver(change, shadow)
)
