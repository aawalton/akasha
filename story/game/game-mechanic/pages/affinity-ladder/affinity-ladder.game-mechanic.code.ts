import { AFFINITY_RANKS } from "akasha/story/game/game-mechanic/modules/affinity-tier/affinity-tier.module.code.ts"
import { climbingBy } from "akasha/story/game/game-mechanic/modules/rank-ladder/rank-ladder.module.code.ts"

export const runMechanic = climbingBy(AFFINITY_RANKS)
