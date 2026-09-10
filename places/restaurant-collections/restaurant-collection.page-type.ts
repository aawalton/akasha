import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const restaurantCollection = {
  id: "01a06807-be66-700c-bf31-55485b34bab0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "restaurant-collection",
  definition: "a shelf of restaurants Alan keeps together",
  pluralSlug: "restaurant-collections",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
