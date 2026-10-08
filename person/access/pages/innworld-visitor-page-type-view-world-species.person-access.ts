import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldSpecies = {
  id: "01a0c954-1328-7f48-bf58-a78fea54eae8",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-species",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-species" },
  createdAt: "2026-09-22T13:35:25.480Z",
  updatedAt: "2026-09-22T13:35:27.000Z",
} as const satisfies PersonAccess
