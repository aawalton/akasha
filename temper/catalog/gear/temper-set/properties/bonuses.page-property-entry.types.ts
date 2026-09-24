import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { BonusCount } from "akasha/temper/catalog/gear/temper-set/properties/bonus-count.number-property.types.ts"
import type { BonusEffects } from "akasha/temper/catalog/gear/temper-set/properties/bonus-effects.record-property.types.ts"
import type { BonusStatus } from "akasha/temper/catalog/gear/temper-set/properties/bonus-status.text-property.types.ts"

export type Bonuses = "jsonl"

export type BonusesRow = {
  id: Id
  count: BonusCount
  status: BonusStatus
  description: Description
  effects?: BonusEffects
}
