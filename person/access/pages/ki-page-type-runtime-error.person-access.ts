import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeRuntimeError = {
  id: "01a0c50f-93be-72ea-8133-993f207cdf2d",
  type: "page-type/person-access",
  slug: "ki-page-type-runtime-error",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "runtime-error",
  deed: ["access-deed/read", "access-deed/write"],
  createdAt: "2026-09-21T17:42:07.550Z",
  updatedAt: "2026-09-21T17:42:18.000Z",
} as const satisfies PersonAccess
