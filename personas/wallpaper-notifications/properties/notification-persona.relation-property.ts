import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const notificationPersona = {
  id: "01a06d66-40f9-7210-8fcc-86ba1e3ac448",
  type: "relation-property",
  slug: "notification-persona",
  propertySlug: "persona",
  definition: "the persona a word to Alan is about",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
