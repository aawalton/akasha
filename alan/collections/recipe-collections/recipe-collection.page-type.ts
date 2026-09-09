import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../../../collections/collection.page-type.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"

export type RecipeCollection = Collection & {
  title: Title
}

export const recipeCollection = {
  id: "01a06807-be66-7010-8d4a-7caba22196b6",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "recipe-collection",
  definition: "a shelf of recipes Alan keeps together",
  pluralSlug: "recipe-collections",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
} as const satisfies PageType
