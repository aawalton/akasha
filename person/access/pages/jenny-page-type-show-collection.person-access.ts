import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeShowCollection = {
  id: "01a174af-7c3a-7ca1-b4b7-489b701651b2",
  type: "page-type/person-access",
  slug: "jenny-page-type-show-collection",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "show-collection",
  deed: ["access-deed/read"],
  createdAt: "2026-10-25T20:10:20.088Z",
  updatedAt: "2026-10-25T20:10:20.088Z",
} as const satisfies PersonAccess
