import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeView = {
  id: "01a0c941-33fe-7e7c-8586-a2de77709054",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-character" },
} as const satisfies PersonAccess
