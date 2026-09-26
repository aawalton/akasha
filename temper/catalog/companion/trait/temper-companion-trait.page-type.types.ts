import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { CompanionMetric } from "akasha/temper/catalog/companion/trait/properties/companion-metric.relation-property.types.ts"
import type { EsoArmorTraitType } from "akasha/temper/catalog/companion/trait/properties/eso-armor-trait-type.number-property.types.ts"
import type { EsoJewelryTraitType } from "akasha/temper/catalog/companion/trait/properties/eso-jewelry-trait-type.number-property.types.ts"
import type { EsoWeaponTraitType } from "akasha/temper/catalog/companion/trait/properties/eso-weapon-trait-type.number-property.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { IsReduction } from "akasha/temper/catalog/companion/trait/properties/is-reduction.boolean-property.types.ts"
import type { TraitEffectType } from "akasha/temper/catalog/companion/trait/properties/trait-effect-type.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionTrait = TemperCompanionThing & {
  key: Key
  metricId?: CompanionMetric
  effectType?: TraitEffectType
  isReduction: IsReduction
  hashPlace: HashPlace
  esoWeaponTraitType?: EsoWeaponTraitType
  esoArmorTraitType?: EsoArmorTraitType
  esoJewelryTraitType?: EsoJewelryTraitType
}
