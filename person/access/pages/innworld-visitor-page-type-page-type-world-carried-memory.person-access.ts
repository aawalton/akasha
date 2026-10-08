import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldCarriedMemory = {
  id: "01a0c5f8-f7a6-75c8-b096-6381cb5c4db0",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-carried-memory",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-carried-memory" },
  createdAt: "2026-09-21T21:57:03.014Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess
