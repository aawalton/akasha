import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldCondition = {
  id: "01a0c954-0fe5-7fd8-b7dd-579b206e06b8",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-condition",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-condition" },
} as const satisfies PersonAccess
