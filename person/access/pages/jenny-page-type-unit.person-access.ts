import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeUnit = {
  id: "01a174af-7c3b-748c-ab96-bd378011fc15",
  type: "page-type/person-access",
  slug: "jenny-page-type-unit",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "unit",
  deed: ["access-deed/read"],
  createdAt: "2026-10-25T20:10:20.088Z",
  updatedAt: "2026-10-25T20:10:20.088Z",
} as const satisfies PersonAccess
