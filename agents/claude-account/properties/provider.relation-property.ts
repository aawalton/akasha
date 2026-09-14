import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const provider = {
  id: "01a0a224-4613-75c9-a6cf-5bdd8111001d",
  type: "relation-property",
  slug: "provider",
  propertySlug: "provider",
  definition: "the provider an account is held with",
  targetPageType: "page-type/model-provider",
  types: "ts",
} as const satisfies RelationProperty
