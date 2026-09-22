import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const scale = {
  id: "01a05446-e764-754e-a88e-2efffba18820",
  type: "page-type/relation-property",
  slug: "scale",
  propertySlug: "scale",
  definition: "a reading's scale",
  targetPageType: "page-type/readout-scale",
  types: "ts",
} as const satisfies RelationProperty
