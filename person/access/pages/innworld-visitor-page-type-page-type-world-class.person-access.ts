import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldClass = {
  id: "01a0c5f6-9a96-7404-81d8-33b4ebb19063",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-class",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-class" },
} as const satisfies PersonAccess
