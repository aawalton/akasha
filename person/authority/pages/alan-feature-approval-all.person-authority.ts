import type { PersonAuthority } from "akasha/person/authority/person-authority.page-type.types.ts"

export const alanFeatureApprovalAll = {
  id: "01a05433-f106-7463-bb14-89bea7577585",
  type: "person-authority",
  slug: "alan-feature-approval-all",
  person: "person/alan",
  authorityKind: "authority-kind/feature-approval",
  target: "all",
} as const satisfies PersonAuthority
