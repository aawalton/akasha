import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeIosApp = {
  id: "01a0c50e-9465-7fda-b158-d0033aafdad5",
  type: "page-type/person-access",
  slug: "jenny-page-type-ios-app",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "ios-app",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
