import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldReputation = {
  id: "01a0c5f8-9fa6-7e6a-b838-60a2d6ad852e",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-reputation",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-reputation" },
} as const satisfies PersonAccess
