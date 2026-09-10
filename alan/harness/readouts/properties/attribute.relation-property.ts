import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const attribute = {
  id: "01a081ef-0b0a-7889-962d-2e766b9aedee",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "attribute",
  propertySlug: "attribute",
  definition: "the attribute whose points a reading counts",
  targetPageType: "page-type/attribute",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout counting an attribute's points names that attribute.",
    },
    {
      invariantKind: "departure",
      statement: "A readout counting anything else names no attribute.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
