import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const loadedBy = {
  id: "01a05234-e093-7966-b707-f7ac0f44d5e2",
  type: "page-type/relation-property",
  slug: "loaded-by",
  propertySlug: "loaded-by",
  definition: "the page whose code loads pages of this type",
  targetPageType: "page-type/domain",
  types: "ts",
  createdAt: "2026-08-30T10:26:32.211Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
