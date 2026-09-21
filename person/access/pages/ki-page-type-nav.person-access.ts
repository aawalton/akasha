import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeNav = {
  id: "01a0c50f-5bfe-702b-a9d1-05a4ec5947a6",
  type: "page-type/person-access",
  slug: "ki-page-type-nav",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "nav",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
