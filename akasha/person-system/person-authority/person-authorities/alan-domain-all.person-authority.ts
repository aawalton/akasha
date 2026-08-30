import type { PersonAuthority } from "../person-authority.page-type.ts"

export const alanDomainAll = {
  id: "01a05433-f105-7c63-bad6-628d7a20081b",
  pageTypeSlug: "person-authority",
  slug: "alan-domain-all",
  personAuthorityPersonSlug: "alan",
  personAuthorityKind: "domain",
  personAuthorityTarget: "all",
} as const satisfies PersonAuthority
