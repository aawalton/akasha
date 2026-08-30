import type { PersonAuthority } from "../person-authority.page-type.ts"

export const alanFeatureRequestAll = {
  id: "01a05433-f106-75d5-b446-7bb4c99f6873",
  pageTypeSlug: "person-authority",
  slug: "alan-feature-request-all",
  personAuthorityPersonSlug: "alan",
  personAuthorityKind: "feature-request",
  personAuthorityTarget: "all",
} as const satisfies PersonAuthority
