import type { MoveToDestination } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { CharacterId } from "../use-destination-types/use-destination-types.module.code.ts"

export interface TierAllocation {
  readonly tierIndex: number
  readonly destination: MoveToDestination
  readonly charId?: CharacterId
  readonly count: number
}
