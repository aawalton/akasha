import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldTitle = {
  id: "01a0c954-13b8-7563-95e1-c12895be03b2",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-title",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-title" },
  createdAt: "2026-09-22T13:35:25.624Z",
  updatedAt: "2026-09-22T13:35:27.000Z",
} as const satisfies PersonAccess
