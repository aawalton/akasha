import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiCollectionTemplate = {
  id: "01a05433-f104-7af1-9306-c61c5767839a",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-collection-template",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-collection-template",
  deed: ["access-deed/read", "access-deed/write"],
  serves: "page-type/collection",
  createdAt: "2026-08-30T19:44:45.316Z",
  updatedAt: "2026-09-22T13:23:05.000Z",
} as const satisfies PersonAccess
