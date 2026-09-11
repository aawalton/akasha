import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const pageDomain = {
  id: "01a04a08-fcf3-7003-9b33-ccbd3edd35cb",
  type: "relation-property",
  slug: "page-domain",
  propertySlug: "domain",
  definition: "a slug naming a domain",
  targetPageType: "page-type/domain",
  types: "ts",
} as const satisfies RelationProperty
