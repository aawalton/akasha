import type { SetBonusSlope } from "akasha/temper/catalog/gear/temper-set-rule/properties/set-bonus-slope.number-property.types.ts"
import type { SetPieceMost } from "akasha/temper/catalog/gear/temper-set-rule/properties/set-piece-most.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperSetRule = TemperThing & {
  setPieceMost: SetPieceMost
  setBonusSlope?: SetBonusSlope
}
