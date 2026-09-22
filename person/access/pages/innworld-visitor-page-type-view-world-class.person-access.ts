import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldClass = {
  id: "01a0c954-0fa3-7e4f-ae81-3b03b404b248",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-class",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-class" },
} as const satisfies PersonAccess
