import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiShow = {
  id: "01a05433-f105-759f-a560-e569a07c586c",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-show",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-show",
  deed: ["access-deed/read", "access-deed/write"],
  serves: "page-type/show",
  createdAt: "2026-08-30T19:44:45.317Z",
  updatedAt: "2026-09-22T13:23:05.000Z",
} as const satisfies PersonAccess
