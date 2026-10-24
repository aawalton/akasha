import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyRouteTherapy = {
  id: "01a16fe6-f5c2-7eb7-a532-71e1bbbb7ac3",
  type: "page-type/person-access",
  slug: "jenny-route-therapy",
  person: "person/jenny",
  accessKind: "access-kind/route",
  target: "therapy",
  deed: ["access-deed/read"],
  createdAt: "2026-10-24T21:52:49.601Z",
  updatedAt: "2026-10-24T21:52:49.601Z",
} as const satisfies PersonAccess
