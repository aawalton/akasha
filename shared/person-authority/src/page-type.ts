export const PERSON_AUTHORITY_SLUG = "person-authority"

export const AUTHORITY_KINDS = [
  "page-schema",
  "page-data",
  "feature-request",
  "feature-approval",
  "domain",
] as const

export type AuthorityKind = (typeof AUTHORITY_KINDS)[number]
