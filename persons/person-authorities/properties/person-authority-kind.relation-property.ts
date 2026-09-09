import type { RelationProperty } from "@akasha/pages/relation-property"

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
  propertySlug: "authority-kind",
  definition: "which sort of act the authority permits",
  targetPageType: "page-type/authority-kind",
} as const satisfies RelationProperty
