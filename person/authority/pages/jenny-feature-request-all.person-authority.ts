import type { PersonAuthority } from "akasha/person/authority/person-authority.page-type.types.ts"

export const jennyFeatureRequestAll = {
  id: "01a05433-f107-756f-b005-96376bf6df11",
  type: "page-type/person-authority",
  slug: "jenny-feature-request-all",
  person: "person/jenny",
  authorityKind: "authority-kind/feature-request",
  target: "all",
  createdAt: "2026-08-30T19:44:45.319Z",
  updatedAt: "2026-09-15T16:11:05.000Z",
} as const satisfies PersonAuthority
