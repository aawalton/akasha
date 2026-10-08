import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiMovie = {
  id: "01a05433-f104-769b-a1be-2612f5f674a0",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-movie",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-movie",
  deed: ["access-deed/read", "access-deed/write"],
  serves: "page-type/movie",
  createdAt: "2026-08-30T19:44:45.316Z",
  updatedAt: "2026-09-22T13:23:05.000Z",
} as const satisfies PersonAccess
