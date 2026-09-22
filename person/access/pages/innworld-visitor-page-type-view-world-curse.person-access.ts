import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldCurse = {
  id: "01a0c954-102b-7313-8e73-17b4eec34953",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-curse",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-curse" },
} as const satisfies PersonAccess
