import type { MetricCharacterAttribute } from "akasha/story/world/mechanics/metrics/metric-character/attribute/metric-character-attribute.page-type.types.ts"
import type { MetricMaxValue } from "akasha/story/world/mechanics/metrics/properties/metric-max-value.number-property.types.ts"
import type { MetricMinValue } from "akasha/story/world/mechanics/metrics/properties/metric-min-value.number-property.types.ts"

export type TowerAttribute = MetricCharacterAttribute & {
  minValue?: MetricMinValue
  maxValue?: MetricMaxValue
}
