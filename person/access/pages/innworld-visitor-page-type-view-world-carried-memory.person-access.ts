import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldCarriedMemory = {
  id: "01a0c954-0f56-757c-b261-f3ae342efd90",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-carried-memory",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-carried-memory" },
} as const satisfies PersonAccess
