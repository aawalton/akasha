import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldItem = {
  id: "01a0c5f7-86ae-7311-b549-f027e46bd3d3",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-item",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-item",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
