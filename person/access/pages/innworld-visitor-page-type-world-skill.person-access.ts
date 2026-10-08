import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldSkill = {
  id: "01a0c5f6-50fe-7e19-a085-987d8ee1aab6",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-skill",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-skill",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
  createdAt: "2026-09-21T21:54:09.278Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess
