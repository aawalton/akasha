import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const entityAffinities = {
  id: "01a0c638-e681-7f8b-9e65-06059960ba7c",
  type: "page-type/record-property",
  slug: "entity-affinities",
  propertySlug: "affinities",
  definition: "what an entity is attuned to, and how far each attunement has climbed",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "text-property/affinity-type", required: true, many: false },
    { pageProperty: "text-property/affinity-tier", required: true, many: false },
    { pageProperty: "number-property/affinity-counter", required: true, many: false },
    { pageProperty: "text-property/listed-effect", required: false, many: false },
    { pageProperty: "text-property/listed-source", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity holds the tier it climbed to rather than the most that tier allows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity climbs a tier by a mechanic rather than by its counter filling.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
