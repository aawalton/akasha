import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldReligion = {
  id: "01a0c954-121d-74a6-b6da-7e16fb5c8f6d",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-religion",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-religion" },
} as const satisfies PersonAccess
