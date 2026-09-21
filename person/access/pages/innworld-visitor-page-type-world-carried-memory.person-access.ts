import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldCarriedMemory = {
  id: "01a0c5f8-ecda-7924-9ece-8a5a96272679",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-carried-memory",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-carried-memory",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
