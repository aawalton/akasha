import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldSpell = {
  id: "01a0c5f6-a594-75f1-847b-826adc50da13",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-spell",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-spell" },
  createdAt: "2026-09-21T21:54:30.932Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess
