import type { PersonAccess } from "akasha/persons/accesses/person-access.page-type.types.ts"

export const alanDomainAll = {
  id: "01a05433-f101-76c2-b99b-20050a09fc81",
  type: "person-access",
  slug: "alan-domain-all",
  person: "alan",
  accessKind: "domain",
  target: "all",
} as const satisfies PersonAccess
