import type { SetBonusScale } from "akasha/temper/catalog/gear/temper-quality/properties/set-bonus-scale.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperSetBonusStep = TemperThing & {
  setBonusScale: SetBonusScale
}
