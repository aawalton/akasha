import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldSpecies = {
  id: "01a0c5f8-57b4-7a84-bee8-9dc8a84cf66a",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-species",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-species",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
