import { refusalsOver } from "akasha/check/code/pages/change-is-reached-through-a-runner/change-is-reached-through-a-runner.check-code.decision.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const changeIsReachedThroughARunner = input(TEXTS, (change) => refusalsOver(change))
