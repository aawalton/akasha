import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeDeviceToken = {
  id: "01a0c50e-7a72-77bc-b980-8a33ebcd20be",
  type: "page-type/person-access",
  slug: "jenny-page-type-device-token",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "device-token",
  deed: ["access-deed/read", "access-deed/write"],
} as const satisfies PersonAccess
