import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type AuthorityKind =
  | "domain"
  | "feature-approval"
  | "feature-request"
  | "page-data"
  | "page-schema"

export const personAuthorityKind = {
  id: "01a0542e-017d-709a-bab6-fa1c73782240",
  pageTypeSlug: "relation-property",
  slug: "person-authority-kind",
  propertySlug: "person-authority-kind",
  definition: "which sort of act the authority permits",
  targetPageTypeSlug: "page-type/authority-kind",
} as const satisfies RelationProperty
