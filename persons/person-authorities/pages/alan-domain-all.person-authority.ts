import type { PersonAuthority } from "../person-authority.page-type.types.ts"

export const alanDomainAll = {
  id: "01a05433-f105-7c63-bad6-628d7a20081b",
  pageTypeSlug: "person-authority",
  type: "person-authority",
  slug: "alan-domain-all",
  person: "alan",
  authorityKind: "domain",
  target: "all",
} as const satisfies PersonAuthority
