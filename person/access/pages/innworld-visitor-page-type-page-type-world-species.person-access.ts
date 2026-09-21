import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldSpecies = {
  id: "01a0c5f8-6205-7701-aa68-fb4a40de1f10",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-species",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-species" },
} as const satisfies PersonAccess
