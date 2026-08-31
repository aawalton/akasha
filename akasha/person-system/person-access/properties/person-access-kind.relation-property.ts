import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type AccessKind = "database-row" | "domain" | "page-type" | "route"

export const personAccessKind = {
  id: "01a0542e-017c-7d0a-bbee-cf9bbe611884",
  pageTypeSlug: "relation-property",
  slug: "person-access-kind",
  propertySlug: "access-kind",
  definition: "which sort of thing the access reaches",
  targetPageTypeSlug: "page-type/access-kind",
} as const satisfies RelationProperty
