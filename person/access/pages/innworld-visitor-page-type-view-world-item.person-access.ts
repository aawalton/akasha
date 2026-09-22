import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldItem = {
  id: "01a0c954-10c1-7ca9-b0c0-d4bf75f09362",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-item",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-item" },
} as const satisfies PersonAccess
