import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldRecipe = WorldMechanic

export const worldRecipe = {
  id: "01a06558-a991-7d40-b27c-78cd6a90c073",
  pageTypeSlug: "page-type",
  slug: "world-recipe",
  definition: "something a character knows how to make",
  pluralSlug: "world-recipes",
  extendsSlug: "page-type/world-mechanic",
  runsTabooCheck: false,
} as const satisfies PageType
