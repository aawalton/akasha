import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldLegacy = {
  id: "01a0c954-110b-7c05-ad92-91103041b194",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-legacy",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-legacy" },
} as const satisfies PersonAccess
