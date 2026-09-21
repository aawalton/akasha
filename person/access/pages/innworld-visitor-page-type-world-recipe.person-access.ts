import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldRecipe = {
  id: "01a0c5f8-2dbc-7e89-8f33-246b0a59b0a5",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-recipe",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-recipe",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
