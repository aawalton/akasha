import type { PersonAuthority } from "akasha/persons/authorities/person-authority.page-type.types.ts"

export const jennyFeatureRequestAll = {
  id: "01a05433-f107-756f-b005-96376bf6df11",
  type: "person-authority",
  slug: "jenny-feature-request-all",
  person: "jenny",
  authorityKind: "feature-request",
  target: "all",
} as const satisfies PersonAuthority
