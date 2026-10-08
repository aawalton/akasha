import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const notificationPersona = {
  id: "01a06d66-40f9-7210-8fcc-86ba1e3ac448",
  type: "page-type/relation-property",
  slug: "notification-persona",
  propertySlug: "persona",
  definition: "the persona a word to Alan is about",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-04T17:10:12.985Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
