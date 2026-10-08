import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeReadout = {
  id: "01a0c50e-16e9-717d-8503-45811c32d27c",
  type: "page-type/person-access",
  slug: "jenny-page-type-readout",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "readout",
  deed: ["access-deed/read", "access-deed/write"],
  createdAt: "2026-09-21T17:40:30.057Z",
  updatedAt: "2026-09-21T17:42:18.000Z",
} as const satisfies PersonAccess
