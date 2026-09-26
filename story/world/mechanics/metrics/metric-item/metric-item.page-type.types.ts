import type { MetricOfItem } from "akasha/story/world/mechanics/metrics/metric-item/properties/metric-of-item.relation-property.types.ts"
import type { WorldMetric } from "akasha/story/world/mechanics/metrics/world-metric.page-type.types.ts"

export type MetricItem = WorldMetric & {
  item: MetricOfItem
}
