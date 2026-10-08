import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldCharacter = {
  id: "01a0c5f6-e982-7e44-8ccf-c1fe7837ccf2",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-character",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-character" },
  createdAt: "2026-09-21T21:54:48.322Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess
