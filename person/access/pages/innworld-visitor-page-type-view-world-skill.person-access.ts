import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldSkill = {
  id: "01a0c954-12a2-7579-afc2-99dd3ea8976a",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-skill",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-skill" },
} as const satisfies PersonAccess
