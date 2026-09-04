import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const collections = {
  id: "01a0673a-bc3a-7003-ac3a-e1fada8a14b7",
  pageTypeSlug: "domain",
  slug: "collections",
  definition: "one catalogue per kind of thing collected, and which items are finished",
  partSlugs: ["page-type/recipe", "page-type/recipe-collection"],
} as const satisfies Domain
