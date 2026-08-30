import type { PersonAuthority } from "../person-authority.page-type.ts"

export const alanFeatureApprovalAll = {
  id: "01a05433-f106-7463-bb14-89bea7577585",
  pageTypeSlug: "person-authority",
  slug: "alan-feature-approval-all",
  personAuthorityPersonSlug: "alan",
  personAuthorityKind: "feature-approval",
  personAuthorityTarget: "all",
} as const satisfies PersonAuthority
