import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldLegacy = {
  id: "01a0c5f8-d65e-71fb-a3c6-e5f60addfada",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-legacy",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-legacy",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
