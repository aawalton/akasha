import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldRecipe = {
  id: "01a0c5f8-3746-7a03-acae-1aa13540c4d2",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-recipe",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-recipe" },
} as const satisfies PersonAccess
