import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldCharacter = {
  id: "01a0c5f6-701d-7a00-bffa-cc8546f35968",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-character",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-character",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
  createdAt: "2026-09-21T21:54:17.245Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess
