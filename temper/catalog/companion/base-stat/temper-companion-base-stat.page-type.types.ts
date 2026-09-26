import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { CompanionMetric } from "akasha/temper/catalog/companion/trait/properties/companion-metric.relation-property.types.ts"
import type { TraitEffectType } from "akasha/temper/catalog/companion/trait/properties/trait-effect-type.text-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/thing/properties/effect-value.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionBaseStat = TemperCompanionThing & {
  key: Key
  metricId: CompanionMetric
  effectType: TraitEffectType
  value: EffectValue
}
