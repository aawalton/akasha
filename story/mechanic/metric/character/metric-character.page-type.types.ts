import type { MetricOfCharacter } from "akasha/story/mechanic/metric/character/properties/metric-of-character.relation-property.types.ts"
import type { Metric } from "akasha/story/mechanic/metric/metric.page-type.types.ts"

export type MetricCharacter = Metric & {
  character: MetricOfCharacter
}
