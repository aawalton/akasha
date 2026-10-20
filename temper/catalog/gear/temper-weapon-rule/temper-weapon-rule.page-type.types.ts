import type { LevelOnePower } from "akasha/temper/catalog/gear/temper-weapon-rule/properties/level-one-power.number-property.types.ts"
import type { TopPower } from "akasha/temper/catalog/gear/temper-weapon-rule/properties/top-power.number-property.types.ts"
import type { TwoHandedMeleePower } from "akasha/temper/catalog/gear/temper-weapon-rule/properties/two-handed-melee-power.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperWeaponRule = TemperThing & {
  levelOnePower: LevelOnePower
  topPower: TopPower
  twoHandedMeleePower: TwoHandedMeleePower
}
