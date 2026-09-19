import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const signInContributor = {
  id: "01a0baea-5af8-7b34-9d41-c76e47d9c2e8",
  type: "page-type/relation-property",
  slug: "sign-in-contributor",
  propertySlug: "contributor",
  definition: "the contributor a sign-in reaches",
  targetPageType: "page-type/contributor",
  types: "ts",
} as const satisfies RelationProperty
