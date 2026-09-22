import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const personasCrafted = {
  id: "01a0655b-4a9b-7004-9d62-a9d0909a21ea",
  type: "page-type/multi-relation-property",
  slug: "personas-crafted",
  propertySlug: "personas-crafted",
  definition: "the personas made or improved on a day",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies MultiRelationProperty
