import type { PersonAuthority } from "akasha/person/authority/person-authority.page-type.types.ts"

export const kiFeatureRequestPages = {
  id: "01a05433-f108-7b93-99c4-02790705abeb",
  type: "page-type/person-authority",
  slug: "ki-feature-request-pages",
  person: "person/ki",
  authorityKind: "authority-kind/feature-request",
  target: "pages",
} as const satisfies PersonAuthority
