import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeReadoutScale = {
  id: "01a0c50e-494a-77ad-a095-de45a08c035b",
  type: "page-type/person-access",
  slug: "jenny-page-type-readout-scale",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "readout-scale",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
