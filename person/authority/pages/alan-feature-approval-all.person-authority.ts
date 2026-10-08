import type { PersonAuthority } from "akasha/person/authority/person-authority.page-type.types.ts"

export const alanFeatureApprovalAll = {
  id: "01a05433-f106-7463-bb14-89bea7577585",
  type: "page-type/person-authority",
  slug: "alan-feature-approval-all",
  person: "person/alan",
  authorityKind: "authority-kind/feature-approval",
  target: "all",
  createdAt: "2026-08-30T19:44:45.318Z",
  updatedAt: "2026-09-15T16:11:05.000Z",
} as const satisfies PersonAuthority
