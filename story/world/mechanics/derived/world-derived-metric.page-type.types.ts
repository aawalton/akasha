import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Formula } from "akasha/story/world/mechanics/derived/properties/formula.module-property-group.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldDerivedMetric = WorldMechanic &
  Domain & {
    formula: Formula
  }
