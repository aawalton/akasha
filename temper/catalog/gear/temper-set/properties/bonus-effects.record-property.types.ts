import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { MetricId } from "akasha/temper/catalog/companion/trait/properties/metric-id.text-property.types.ts"
import type { BuffId } from "akasha/temper/catalog/gear/thing/properties/buff-id.one-of-property.types.ts"
import type { EffectType } from "akasha/temper/catalog/thing/properties/effect-type.text-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/thing/properties/effect-value.number-property.types.ts"

export type BonusEffects = List<{
  metricId?: MetricId
  type?: EffectType
  value?: EffectValue
  buffId?: BuffId
}>
