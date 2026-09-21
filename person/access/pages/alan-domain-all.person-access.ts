import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const alanDomainAll = {
  id: "01a05433-f101-76c2-b99b-20050a09fc81",
  type: "page-type/person-access",
  slug: "alan-domain-all",
  person: "person/alan",
  accessKind: "access-kind/domain",
  target: "all",
  deed: ["access-deed/read", "access-deed/write"],
} as const satisfies PersonAccess
