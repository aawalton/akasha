import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const provider = {
  id: "01a0a224-4613-75c9-a6cf-5bdd8111001d",
  type: "page-type/relation-property",
  slug: "provider",
  propertySlug: "provider",
  definition: "the company that runs the models a model account calls",
  targetPageType: "page-type/model-provider",
  types: "ts",
  createdAt: "2026-09-14T22:58:01.363Z",
  updatedAt: "2026-09-25T17:56:19.000Z",
} as const satisfies RelationProperty
