import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const sentTo = {
  id: "01a05f42-d941-7002-b41d-b3dedda83287",
  type: "relation-property",
  slug: "sent-to",
  propertySlug: "to",
  definition: "the persona something is sent to",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
