import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const scale = {
  id: "01a05446-e764-754e-a88e-2efffba18820",
  type: "relation-property",
  slug: "scale",
  propertySlug: "scale",
  definition: "the scale a reading is read against",
  targetPageType: "page-type/readout-scale",
  types: "ts",
} as const satisfies RelationProperty
