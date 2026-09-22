import type { MetricOfItem } from "akasha/story/mechanic/metric/item/properties/metric-of-item.relation-property.types.ts"
import type { Metric } from "akasha/story/mechanic/metric/metric.page-type.types.ts"

export type MetricItem = Metric & {
  item: MetricOfItem
}
