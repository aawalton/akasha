import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Settling } from "akasha/story/mechanic/check/properties/settling.module-property-group.ts"
import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"

export type MechanicCheck = Mechanic &
  Domain & {
    settling: Settling
  }
