import type { RelationProperty } from "../../pages/relation-properties/relation-property.page-type.types.ts"

export const changeMode = {
  id: "01a07c24-7fb6-7822-ae49-528d32267cb2",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "change-mode",
  propertySlug: "change-mode",
  definition: "the change mode a change is",
  targetPageType: "page-type/change-mode",
  types: "ts",
} as const satisfies RelationProperty
