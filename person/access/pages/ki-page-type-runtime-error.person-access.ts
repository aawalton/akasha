import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeRuntimeError = {
  id: "01a0c50f-93be-72ea-8133-993f207cdf2d",
  type: "page-type/person-access",
  slug: "ki-page-type-runtime-error",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "runtime-error",
  deed: ["access-deed/read", "access-deed/write"],
} as const satisfies PersonAccess
