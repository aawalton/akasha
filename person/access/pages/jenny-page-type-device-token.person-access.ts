import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeDeviceToken = {
  id: "01a0c50e-7a72-77bc-b980-8a33ebcd20be",
  type: "page-type/person-access",
  slug: "jenny-page-type-device-token",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "device-token",
  deed: ["access-deed/read", "access-deed/write"],
  createdAt: "2026-09-21T17:40:55.538Z",
  updatedAt: "2026-09-21T17:42:18.000Z",
} as const satisfies PersonAccess
