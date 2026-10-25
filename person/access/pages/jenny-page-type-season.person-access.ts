import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeSeason = {
  id: "01a174af-7c3a-721a-b794-441f86cdd659",
  type: "page-type/person-access",
  slug: "jenny-page-type-season",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "season",
  deed: ["access-deed/read", "access-deed/write"],
  createdAt: "2026-10-25T20:10:20.088Z",
  updatedAt: "2026-10-25T20:10:20.088Z",
} as const satisfies PersonAccess
