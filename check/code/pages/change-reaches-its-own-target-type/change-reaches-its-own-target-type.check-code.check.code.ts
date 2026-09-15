import {
  CHANGES,
  refusalsOver,
} from "akasha/check/code/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.check-code.decision.code.ts"
import { input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const changeReachesItsOwnTargetType = input(CHANGES, refusalsOver)
