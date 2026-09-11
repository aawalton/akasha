import type { PersonAccess } from "akasha/persons/accesses/person-access.page-type.types.ts"

export const kiPageTypeKiFranchise = {
  id: "01a05433-f104-7bfb-b13d-3cf4c46cd143",
  type: "person-access",
  slug: "ki-page-type-ki-franchise",
  person: "ki",
  accessKind: "page-type",
  target: "ki-franchise",
  serves: "franchise",
} as const satisfies PersonAccess
