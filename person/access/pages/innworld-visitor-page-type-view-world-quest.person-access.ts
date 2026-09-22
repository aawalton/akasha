import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldQuest = {
  id: "01a0c954-1196-7768-be41-0ffd2368d2e3",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-quest",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-quest" },
} as const satisfies PersonAccess
