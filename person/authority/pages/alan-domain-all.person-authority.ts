import type { PersonAuthority } from "akasha/person/authority/person-authority.page-type.types.ts"

export const alanDomainAll = {
  id: "01a05433-f105-7c63-bad6-628d7a20081b",
  type: "page-type/person-authority",
  slug: "alan-domain-all",
  person: "person/alan",
  authorityKind: "authority-kind/domain",
  target: "all",
} as const satisfies PersonAuthority
