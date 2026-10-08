import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiBookSeries = {
  id: "01a05433-f103-740e-8a49-dbe3f9a58d53",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-book-series",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-book-series",
  deed: ["access-deed/read", "access-deed/write"],
  serves: "page-type/book-series",
  createdAt: "2026-08-30T19:44:45.315Z",
  updatedAt: "2026-09-22T13:23:05.000Z",
} as const satisfies PersonAccess
