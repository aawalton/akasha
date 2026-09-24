import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { CompanionMetric } from "akasha/temper/catalog/companion/trait/properties/companion-metric.relation-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/thing/properties/effect-value.number-property.types.ts"

export type PassiveEffects = "jsonl"

export type PassiveEffectsRow = {
  id: Id
  metricId: CompanionMetric
  value: EffectValue
}
