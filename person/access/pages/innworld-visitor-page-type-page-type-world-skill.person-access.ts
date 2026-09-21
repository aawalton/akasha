import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldSkill = {
  id: "01a0c5f6-901b-79a7-ba08-510cd26a9e79",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-skill",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-skill" },
} as const satisfies PersonAccess
