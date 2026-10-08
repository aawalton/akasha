import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldClass = {
  id: "01a0c5f6-9a96-7404-81d8-33b4ebb19063",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-class",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-class" },
  createdAt: "2026-09-21T21:54:28.118Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess
