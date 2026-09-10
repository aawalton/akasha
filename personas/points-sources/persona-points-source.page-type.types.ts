import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { PointsSourceAggregate } from "./properties/points-source-aggregate.text-property.ts"
import type { PointsSourceKind } from "./properties/points-source-kind.text-property.ts"
import type { PointsSourceMarker } from "./properties/points-source-marker.text-property.ts"
import type { PointsSourcePathPrefix } from "./properties/points-source-path-prefix.text-property.ts"
import type { PointsSourcePointField } from "./properties/points-source-point-field.text-property.ts"
import type { PointsSourceReadings } from "./properties/points-source-readings.text-property.ts"
import type { PointsSourceWeightField } from "./properties/points-source-weight-field.text-property.ts"
import type { SourcePersona } from "./properties/source-persona.relation-property.ts"

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
