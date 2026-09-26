import type { MetricOfCharacter } from "akasha/story/world/mechanics/metrics/metric-character/properties/metric-of-character.relation-property.types.ts"
import type { WorldMetric } from "akasha/story/world/mechanics/metrics/world-metric.page-type.types.ts"

export type MetricCharacter = WorldMetric & {
  character: MetricOfCharacter
}
