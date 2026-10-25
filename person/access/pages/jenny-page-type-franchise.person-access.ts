import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeFranchise = {
  id: "01a174af-7c3a-77ea-b615-ec4927096abf",
  type: "page-type/person-access",
  slug: "jenny-page-type-franchise",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "franchise",
  deed: ["access-deed/read"],
  createdAt: "2026-10-25T20:10:20.088Z",
  updatedAt: "2026-10-25T20:10:20.088Z",
} as const satisfies PersonAccess
