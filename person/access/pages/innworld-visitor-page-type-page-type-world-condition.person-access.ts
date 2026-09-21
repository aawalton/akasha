import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldCondition = {
  id: "01a0c5f7-a6bd-74cb-8066-0586fa8fef0a",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-condition",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-condition" },
} as const satisfies PersonAccess
