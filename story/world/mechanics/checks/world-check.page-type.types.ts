import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { DifficultyMoved } from "akasha/story/world/mechanics/checks/properties/difficulty-moved.boolean-property.types.ts"
import type { Settling } from "akasha/story/world/mechanics/checks/properties/settling.module-property-group.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldCheck = WorldMechanic &
  Domain & {
    settling: Settling
    difficultyMoved?: DifficultyMoved
  }
