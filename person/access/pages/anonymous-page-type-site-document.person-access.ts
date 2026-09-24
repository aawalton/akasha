import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeSiteDocument = {
  id: "01a0d5a8-c966-7e94-9109-1472dcd897e4",
  type: "page-type/person-access",
  slug: "anonymous-page-type-site-document",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "site-document",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
