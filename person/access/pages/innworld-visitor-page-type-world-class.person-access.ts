import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldClass = {
  id: "01a0c5f6-59e3-7cef-b17d-ef945317ff8d",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-class",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-class",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
