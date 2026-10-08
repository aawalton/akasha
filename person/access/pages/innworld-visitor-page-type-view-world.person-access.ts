import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorld = {
  id: "01a0ea29-ba7e-7103-b4d4-9c33cfcb16a4",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world" },
  createdAt: "2026-09-28T22:36:38.398Z",
  updatedAt: "2026-09-28T22:36:41.000Z",
} as const satisfies PersonAccess
