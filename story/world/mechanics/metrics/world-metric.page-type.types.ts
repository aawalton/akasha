import type { History } from "akasha/story/world/mechanics/metrics/properties/history.file-property.types.ts"
import type { MetricMaxValue } from "akasha/story/world/mechanics/metrics/properties/metric-max-value.number-property.types.ts"
import type { MetricMinValue } from "akasha/story/world/mechanics/metrics/properties/metric-min-value.number-property.types.ts"
import type { MetricValue } from "akasha/story/world/mechanics/metrics/properties/metric-value.number-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldMetric = WorldMechanic & {
  value: MetricValue
  minValue?: MetricMinValue
  maxValue?: MetricMaxValue
  history?: History
}
