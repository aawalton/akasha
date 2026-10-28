import type { StatGroup } from "akasha/story/world/mechanics/metrics/metric-character/attribute/properties/stat-group.relation-property.types.ts"
import type { MetricCharacter } from "akasha/story/world/mechanics/metrics/metric-character/metric-character.page-type.types.ts"

export type MetricCharacterAttribute = MetricCharacter & {
  statGroup?: StatGroup
}
