import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const programs = {
  id: "01a0775f-5cca-7000-ad4b-c0a1dcdf54c6",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "programs",
  propertySlug: "programs",
  definition: "the programs an app builds",
  targetPageType: "page-type/ios-program",
  types: "ts",
} as const satisfies RelationProperty
