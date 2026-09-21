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
} as const satisfies PersonAccess
