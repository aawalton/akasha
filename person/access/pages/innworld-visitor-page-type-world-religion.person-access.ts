import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldReligion = {
  id: "01a0c5f9-1875-7756-aedb-98e07ed120c9",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-religion",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-religion",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
