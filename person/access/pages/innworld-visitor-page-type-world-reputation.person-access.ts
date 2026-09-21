import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldReputation = {
  id: "01a0c5f8-9487-763a-b1ea-021954f3b679",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-reputation",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-reputation",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
