import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorld = {
  id: "01a0c5f6-8520-7aeb-9563-2d945c1815b7",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "the-wandering-inn" },
} as const satisfies PersonAccess
