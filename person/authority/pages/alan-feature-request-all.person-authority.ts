import type { PersonAuthority } from "akasha/person/authority/person-authority.page-type.types.ts"

export const alanFeatureRequestAll = {
  id: "01a05433-f106-75d5-b446-7bb4c99f6873",
  type: "page-type/person-authority",
  slug: "alan-feature-request-all",
  person: "person/alan",
  authorityKind: "authority-kind/feature-request",
  target: "all",
  createdAt: "2026-08-30T19:44:45.318Z",
  updatedAt: "2026-09-15T16:11:05.000Z",
} as const satisfies PersonAuthority
