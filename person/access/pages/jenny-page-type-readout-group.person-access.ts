import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeReadoutGroup = {
  id: "01a0c50e-308d-7411-9ea2-058bfa306bad",
  type: "page-type/person-access",
  slug: "jenny-page-type-readout-group",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "readout-group",
  deed: ["access-deed/read"],
  createdAt: "2026-09-21T17:40:36.621Z",
  updatedAt: "2026-09-21T17:42:18.000Z",
} as const satisfies PersonAccess
