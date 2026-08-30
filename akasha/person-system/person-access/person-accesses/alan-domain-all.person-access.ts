import type { PersonAccess } from "../person-access.page-type.ts"

export const alanDomainAll = {
  id: "01a05433-f101-76c2-b99b-20050a09fc81",
  pageTypeSlug: "person-access",
  slug: "alan-domain-all",
  personAccessPersonSlug: "alan",
  personAccessKind: "domain",
  personAccessTarget: "all",
} as const satisfies PersonAccess
