import type { PersonAuthority } from "akasha/persons/authorities/person-authority.page-type.types.ts"

export const kiFeatureRequestPages = {
  id: "01a05433-f108-7b93-99c4-02790705abeb",
  type: "person-authority",
  slug: "ki-feature-request-pages",
  person: "ki",
  authorityKind: "feature-request",
  target: "pages",
} as const satisfies PersonAuthority
