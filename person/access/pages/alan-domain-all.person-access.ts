import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const alanDomainAll = {
  id: "01a05433-f101-76c2-b99b-20050a09fc81",
  type: "page-type/person-access",
  slug: "alan-domain-all",
  person: "person/alan",
  accessKind: "access-kind/domain",
  target: "all",
  deed: ["access-deed/read", "access-deed/write"],
  createdAt: "2026-08-30T19:44:45.313Z",
  updatedAt: "2026-09-21T17:03:22.000Z",
} as const satisfies PersonAccess
