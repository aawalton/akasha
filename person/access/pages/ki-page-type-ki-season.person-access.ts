import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiSeason = {
  id: "01a05433-f105-761b-baed-d61da7f3de85",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-season",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-season",
  deed: ["access-deed/read", "access-deed/write"],
  serves: "page-type/season",
  createdAt: "2026-08-30T19:44:45.317Z",
  updatedAt: "2026-09-22T13:23:05.000Z",
} as const satisfies PersonAccess
