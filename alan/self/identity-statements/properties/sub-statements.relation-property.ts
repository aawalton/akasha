import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const subStatements = {
  id: "01a0658a-739f-7ad3-8836-aaf163131279",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "sub-statements",
  propertySlug: "sub-statements",
  definition: "the statements sitting under this one",
  targetPageType: "page-type/identity-statement",
  types: "ts",
} as const satisfies RelationProperty
