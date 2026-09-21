import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldQuest = {
  id: "01a0c5f8-420d-7e8d-88b8-1a45de26a8d5",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-quest",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-quest",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
