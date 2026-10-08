import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeIosApp = {
  id: "01a0c50e-9465-7fda-b158-d0033aafdad5",
  type: "page-type/person-access",
  slug: "jenny-page-type-ios-app",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "ios-app",
  deed: ["access-deed/read"],
  createdAt: "2026-09-21T17:41:02.181Z",
  updatedAt: "2026-09-21T17:42:18.000Z",
} as const satisfies PersonAccess
