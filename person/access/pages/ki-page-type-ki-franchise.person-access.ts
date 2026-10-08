import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiFranchise = {
  id: "01a05433-f104-7bfb-b13d-3cf4c46cd143",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-franchise",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-franchise",
  deed: ["access-deed/read", "access-deed/write"],
  serves: "page-type/franchise",
  createdAt: "2026-08-30T19:44:45.316Z",
  updatedAt: "2026-09-22T13:23:05.000Z",
} as const satisfies PersonAccess
