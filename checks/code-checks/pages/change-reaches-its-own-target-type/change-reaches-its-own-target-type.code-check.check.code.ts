import {
  CHANGES,
  refusalsOver,
} from "akasha/checks/code-checks/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.code-check.decision.code.ts"
import { input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const changeReachesItsOwnTargetType = input(CHANGES, refusalsOver)
