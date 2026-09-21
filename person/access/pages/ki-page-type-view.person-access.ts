import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeView = {
  id: "01a0c50f-769f-78ff-8c60-08abeccc0655",
  type: "page-type/person-access",
  slug: "ki-page-type-view",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
