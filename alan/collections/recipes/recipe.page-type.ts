import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../../../collections/collection.page-type.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"

export type Recipe = Collection & {
  title: Title
}

export const recipe = {
  id: "01a06807-be66-700f-92e8-bca7096b21be",
  pageTypeSlug: "page-type",
  slug: "recipe",
  definition: "a dish Alan cooks",
  pluralSlug: "recipes",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
} as const satisfies PageType
