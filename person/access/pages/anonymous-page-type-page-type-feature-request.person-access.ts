import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypePageTypeFeatureRequest = {
  id: "01a0c52d-315f-7890-a567-7b39c657fb30",
  type: "page-type/person-access",
  slug: "anonymous-page-type-page-type-feature-request",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read"],
  narrow: { key: "slug", is: "feature-request" },
} as const satisfies PersonAccess
