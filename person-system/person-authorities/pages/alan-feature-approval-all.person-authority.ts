import type { PersonAuthority } from "../person-authority.page-type.ts"

export const alanFeatureApprovalAll = {
  id: "01a05433-f106-7463-bb14-89bea7577585",
  pageTypeSlug: "person-authority",
  slug: "alan-feature-approval-all",
  personSlug: "alan",
  authorityKind: "feature-approval",
  target: "all",
} as const satisfies PersonAuthority
