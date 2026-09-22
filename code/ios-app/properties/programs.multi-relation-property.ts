import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const programs = {
  id: "01a0775f-5cca-7000-ad4b-c0a1dcdf54c6",
  type: "page-type/multi-relation-property",
  slug: "programs",
  propertySlug: "programs",
  definition: "the programs an app builds",
  targetPageType: "page-type/ios-program",
  types: "ts",
} as const satisfies MultiRelationProperty
