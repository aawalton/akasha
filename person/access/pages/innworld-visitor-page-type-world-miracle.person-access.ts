import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldMiracle = {
  id: "01a0c5f7-c780-7e87-aab2-3f73e6cdf9cf",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-miracle",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-miracle",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
