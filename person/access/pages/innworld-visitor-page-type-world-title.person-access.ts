import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldTitle = {
  id: "01a0c5f7-b192-7dd1-bfcd-c00672ac41b1",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-title",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-title",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
  createdAt: "2026-09-21T21:55:39.538Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess
