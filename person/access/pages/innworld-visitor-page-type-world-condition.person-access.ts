import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldCondition = {
  id: "01a0c5f7-9ba5-7051-a2c8-0a565510055e",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-condition",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-condition",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
