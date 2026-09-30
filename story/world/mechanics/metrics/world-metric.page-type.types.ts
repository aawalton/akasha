import type { History } from "akasha/story/world/mechanics/metrics/properties/history.file-property.types.ts"
import type { MetricMaxValue } from "akasha/story/world/mechanics/metrics/properties/metric-max-value.number-property.types.ts"
import type { MetricMinValue } from "akasha/story/world/mechanics/metrics/properties/metric-min-value.number-property.types.ts"
import type { MetricValue } from "akasha/story/world/mechanics/metrics/properties/metric-value.number-property.types.ts"
import type { RevealedAs } from "akasha/story/world/mechanics/metrics/properties/revealed-as.text-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type WorldMetric = WorldMechanic & {
  value: MetricValue
  minValue?: MetricMinValue
  maxValue?: MetricMaxValue
  history?: History
  displayOrder?: DisplayOrder
  revealedAs?: RevealedAs
}
