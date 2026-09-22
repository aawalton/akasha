import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"
import type { History } from "akasha/story/mechanic/metric/properties/history.file-property.types.ts"
import type { MetricMaxValue } from "akasha/story/mechanic/metric/properties/metric-max-value.number-property.types.ts"
import type { MetricMinValue } from "akasha/story/mechanic/metric/properties/metric-min-value.number-property.types.ts"
import type { MetricOfCharacter } from "akasha/story/mechanic/metric/properties/metric-of-character.relation-property.types.ts"
import type { MetricValue } from "akasha/story/mechanic/metric/properties/metric-value.number-property.types.ts"

export type Metric = Mechanic & {
  character: MetricOfCharacter
  value: MetricValue
  minValue?: MetricMinValue
  maxValue?: MetricMaxValue
  history?: History
}
