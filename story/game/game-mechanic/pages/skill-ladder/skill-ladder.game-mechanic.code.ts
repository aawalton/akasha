import { SKILL_RANKS } from "akasha/story/game/game-mechanic/modules/skill-rung/skill-rung.module.code.ts"
import { climbingBy } from "akasha/story/world/mechanics/modules/rank-ladder/rank-ladder.module.code.ts"

export const runMechanic = climbingBy(SKILL_RANKS)
