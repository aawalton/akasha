import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeSiteDocument = {
  id: "01a0d5a8-c966-7e94-9109-1472dcd897e4",
  type: "page-type/person-access",
  slug: "anonymous-page-type-site-document",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "site-document",
  deed: ["access-deed/read"],
  createdAt: "2026-09-24T23:03:23.750Z",
  updatedAt: "2026-09-24T23:03:48.000Z",
} as const satisfies PersonAccess
