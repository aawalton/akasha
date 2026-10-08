import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeRuntimeError = {
  id: "01a0c50e-c6f9-7ca6-b331-e9bfea3c6273",
  type: "page-type/person-access",
  slug: "jenny-page-type-runtime-error",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "runtime-error",
  deed: ["access-deed/read", "access-deed/write"],
  createdAt: "2026-09-21T17:41:15.129Z",
  updatedAt: "2026-09-21T17:42:18.000Z",
} as const satisfies PersonAccess
