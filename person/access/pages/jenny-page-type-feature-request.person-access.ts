import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeFeatureRequest = {
  id: "01a0c50e-ad0e-7a77-8fa4-9d499bf0e7b3",
  type: "page-type/person-access",
  slug: "jenny-page-type-feature-request",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "feature-request",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
