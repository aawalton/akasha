import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const provider = {
  id: "01a0a224-4613-75c9-a6cf-5bdd8111001d",
  type: "page-type/relation-property",
  slug: "provider",
  propertySlug: "provider",
  definition: "an account's provider",
  targetPageType: "page-type/model-provider",
  types: "ts",
} as const satisfies RelationProperty
