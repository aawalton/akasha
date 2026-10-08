import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const sentTo = {
  id: "01a05f42-d941-7002-b41d-b3dedda83287",
  type: "page-type/relation-property",
  slug: "sent-to",
  propertySlug: "to",
  definition: "the persona something is sent to",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-01T23:16:51.649Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
