import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldRecipe = {
  id: "01a0c954-11d3-7624-96b9-cb68db70803c",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-recipe",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-recipe" },
  createdAt: "2026-09-22T13:35:25.139Z",
  updatedAt: "2026-09-22T13:35:27.000Z",
} as const satisfies PersonAccess
