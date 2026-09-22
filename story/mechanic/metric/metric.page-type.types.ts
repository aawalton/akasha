import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"
import type { History } from "akasha/story/mechanic/metric/properties/history.file-property.types.ts"
import type { MetricCharacter } from "akasha/story/mechanic/metric/properties/metric-character.relation-property.types.ts"
import type { MetricMaxValue } from "akasha/story/mechanic/metric/properties/metric-max-value.number-property.types.ts"
import type { MetricMinValue } from "akasha/story/mechanic/metric/properties/metric-min-value.number-property.types.ts"
import type { MetricValue } from "akasha/story/mechanic/metric/properties/metric-value.number-property.types.ts"

export type Metric = Mechanic & {
  character: MetricCharacter
  value: MetricValue
  minValue?: MetricMinValue
  maxValue?: MetricMaxValue
  history?: History
}
