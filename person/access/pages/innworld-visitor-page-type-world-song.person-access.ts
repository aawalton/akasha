import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldSong = {
  id: "01a0c5f8-aa65-7cd3-a266-c38883f6d367",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-song",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-song",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
