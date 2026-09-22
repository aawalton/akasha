import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldBoon = {
  id: "01a0c954-0f13-70e5-bb9a-3311dcc03d07",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-boon",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-boon" },
} as const satisfies PersonAccess
