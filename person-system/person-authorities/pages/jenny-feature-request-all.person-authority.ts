import type { PersonAuthority } from "../person-authority.page-type.ts"

export const jennyFeatureRequestAll = {
  id: "01a05433-f107-756f-b005-96376bf6df11",
  pageTypeSlug: "person-authority",
  slug: "jenny-feature-request-all",
  personSlug: "jenny",
  authorityKind: "feature-request",
  target: "all",
} as const satisfies PersonAuthority
