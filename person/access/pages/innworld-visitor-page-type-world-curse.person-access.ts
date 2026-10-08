import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldCurse = {
  id: "01a0c5f8-7ef2-74f2-b00e-f7dbc8ab89bf",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-curse",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-curse",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
  createdAt: "2026-09-21T21:56:32.114Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess
