import type { PersonAuthority } from "akasha/persons/authorities/person-authority.page-type.types.ts"

export const kiFeatureRequestArchiveofworlds = {
  id: "01a05433-f107-75d2-bd48-a5e1960f21e0",
  type: "person-authority",
  slug: "ki-feature-request-archiveofworlds",
  person: "ki",
  authorityKind: "feature-request",
  target: "archiveofworlds",
} as const satisfies PersonAuthority
