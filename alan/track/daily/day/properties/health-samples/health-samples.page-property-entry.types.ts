import type { Unit } from "akasha/alan/harness/readout/properties/unit.text-property.types.ts"
import type { ArrivedAt } from "akasha/alan/track/daily/day/properties/health-samples/properties/arrived-at.instant-property.types.ts"
import type { EndedAt } from "akasha/alan/track/daily/day/properties/health-samples/properties/ended-at.instant-property.types.ts"
import type { SourceName } from "akasha/alan/track/daily/day/properties/health-samples/properties/source-name.text-property.types.ts"
import type { StartedAt } from "akasha/alan/track/daily/day/properties/health-samples/properties/started-at.instant-property.types.ts"
import type { Value } from "akasha/alan/track/daily/day/properties/health-samples/properties/value.number-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Metric } from "akasha/product/game/clear-the-world/ctw-achievement/properties/metric.text-property.types.ts"

export type HealthSamples = "jsonl"

export type HealthSamplesRow = {
  id: Id
  metric: Metric
  startedAt: StartedAt
  endedAt: EndedAt
  value: Value
  unit: Unit
  sourceName: SourceName
  arrivedAt: ArrivedAt
}
