import { refusalsOver } from "akasha/checks/code-checks/pages/change-is-reached-through-a-runner/change-is-reached-through-a-runner.code-check.decision.code.ts"
import { input, TEXTS } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const changeIsReachedThroughARunner = input(TEXTS, (change) => refusalsOver(change))
