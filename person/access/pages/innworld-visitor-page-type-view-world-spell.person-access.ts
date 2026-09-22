import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldSpell = {
  id: "01a0c954-1376-7ada-a26b-2dbb89c4e108",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-spell",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-spell" },
} as const satisfies PersonAccess
