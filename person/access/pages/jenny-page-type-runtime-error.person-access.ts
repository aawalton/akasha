import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeRuntimeError = {
  id: "01a0c50e-c6f9-7ca6-b331-e9bfea3c6273",
  type: "page-type/person-access",
  slug: "jenny-page-type-runtime-error",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "runtime-error",
  deed: ["access-deed/read", "access-deed/write"],
} as const satisfies PersonAccess
