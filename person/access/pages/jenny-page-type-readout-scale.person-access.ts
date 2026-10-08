import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeReadoutScale = {
  id: "01a0c50e-494a-77ad-a095-de45a08c035b",
  type: "page-type/person-access",
  slug: "jenny-page-type-readout-scale",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "readout-scale",
  deed: ["access-deed/read"],
  createdAt: "2026-09-21T17:40:42.954Z",
  updatedAt: "2026-09-21T17:42:18.000Z",
} as const satisfies PersonAccess
