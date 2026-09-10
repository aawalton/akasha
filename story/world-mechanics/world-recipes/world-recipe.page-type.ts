import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const worldRecipe = {
  id: "01a06558-a991-7d40-b27c-78cd6a90c073",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-recipe",
  definition: "something a character knows how to make",
  pluralSlug: "world-recipes",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
