import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const changeTargetSubtype = {
  id: "01a07c70-2c9f-7d84-a5fc-f10029577f81",
  type: "relation-property",
  slug: "change-target-subtype",
  propertySlug: "change-target-subtype",
  definition: "the change target subtype a change acts on",
  targetPageType: "page-type/change-target-subtype",
  types: "ts",
} as const satisfies RelationProperty
