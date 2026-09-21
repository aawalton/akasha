import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeReadoutGroup = {
  id: "01a0c50e-308d-7411-9ea2-058bfa306bad",
  type: "page-type/person-access",
  slug: "jenny-page-type-readout-group",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "readout-group",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
