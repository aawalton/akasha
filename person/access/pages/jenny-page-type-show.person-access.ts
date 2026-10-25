import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeShow = {
  id: "01a174af-7c3a-7f1a-bcd5-0c9b5a44534f",
  type: "page-type/person-access",
  slug: "jenny-page-type-show",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "show",
  deed: ["access-deed/read", "access-deed/write"],
  createdAt: "2026-10-25T20:10:20.088Z",
  updatedAt: "2026-10-25T20:10:20.088Z",
} as const satisfies PersonAccess
