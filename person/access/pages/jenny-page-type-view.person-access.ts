import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeView = {
  id: "01a174af-7c3b-7cd8-a3a8-e102534b2455",
  type: "page-type/person-access",
  slug: "jenny-page-type-view",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "nav", is: "nav/jenny-hallmark" },
  createdAt: "2026-10-25T20:10:20.088Z",
  updatedAt: "2026-10-25T20:10:20.088Z",
} as const satisfies PersonAccess
