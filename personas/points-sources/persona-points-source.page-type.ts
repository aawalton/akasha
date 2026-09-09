import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "akasha/domains/domain.page-type.ts"
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

export const personaPointsSource = {
  id: "01a00115-e648-7000-badd-cf9b31eda2f3",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "persona-points-source",
  definition: "the thing a persona's points are counted from",
  pluralSlug: "persona-points-sources",
  extends: ["page-type/domain"],
  parts: [
    "relation-property/source-persona",
    "text-property/points-source-kind",
    "text-property/points-source-marker",
    "text-property/points-source-aggregate",
    "text-property/points-source-path-prefix",
    "text-property/points-source-point-field",
    "text-property/points-source-weight-field",
    "text-property/points-source-readings",
  ],
  properties: [
    { pageProperty: "relation-property/source-persona", required: true, many: false },
    { pageProperty: "text-property/points-source-kind", required: true, many: false },
    { pageProperty: "text-property/points-source-marker", required: false, many: false },
    { pageProperty: "text-property/points-source-aggregate", required: false, many: false },
    { pageProperty: "text-property/points-source-path-prefix", required: false, many: false },
    { pageProperty: "text-property/points-source-point-field", required: false, many: false },
    { pageProperty: "text-property/points-source-weight-field", required: false, many: false },
    {
      pageProperty: "text-property/points-source-readings",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona's source is settled in a document of her own.",
    },
    {
      invariantKind: "departure",
      statement: "The engine works out a source from the rule that source states.",
    },
    {
      invariantKind: "departure",
      statement: "A source the engine cannot work out names the writer computing that source.",
    },
    {
      invariantKind: "departure",
      statement: "Every earning persona's document has the rule naming her source.",
    },
    {
      invariantKind: "departure",
      statement: "The engine can read every source a persona's document names.",
    },
  ],
} as const satisfies PageType
