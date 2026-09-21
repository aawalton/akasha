import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldSpell = {
  id: "01a0c5f6-64d9-7f41-a1d6-4d1043dbd1f0",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-spell",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-spell",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
