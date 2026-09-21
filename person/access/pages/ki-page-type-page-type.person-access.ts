import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypePageType = {
  id: "01a0c50f-2981-7b74-826e-9e5ca9f54605",
  type: "page-type/person-access",
  slug: "ki-page-type-page-type",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
