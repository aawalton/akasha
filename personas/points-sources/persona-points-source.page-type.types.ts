import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { PointsSourceAggregate } from "akasha/personas/points-sources/properties/points-source-aggregate.select-property.ts"
import type { PointsSourceKind } from "akasha/personas/points-sources/properties/points-source-kind.select-property.ts"
import type { PointsSourceMarker } from "akasha/personas/points-sources/properties/points-source-marker.text-property.types.ts"
import type { PointsSourcePathPrefix } from "akasha/personas/points-sources/properties/points-source-path-prefix.text-property.types.ts"
import type { PointsSourcePointField } from "akasha/personas/points-sources/properties/points-source-point-field.text-property.types.ts"
import type { PointsSourceReadings } from "akasha/personas/points-sources/properties/points-source-readings.text-property.types.ts"
import type { PointsSourceWeightField } from "akasha/personas/points-sources/properties/points-source-weight-field.text-property.types.ts"
import type { SourcePersona } from "akasha/personas/points-sources/properties/source-persona.relation-property.types.ts"

export type PersonaPointsSource = Domain & {
  persona: SourcePersona
  kind: PointsSourceKind
  marker?: PointsSourceMarker
  aggregate?: PointsSourceAggregate
  pathPrefix?: PointsSourcePathPrefix
  pointField?: PointsSourcePointField
  weightField?: PointsSourceWeightField
  readings?: PointsSourceReadings
}
