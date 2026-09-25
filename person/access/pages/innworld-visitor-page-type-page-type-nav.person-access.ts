import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeNav = {
  id: "01a0d922-58fd-7f0e-ac6d-5f06ed00415f",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-nav",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "nav" },
} as const satisfies PersonAccess
