import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const restaurantCollection = {
  id: "01a06807-be66-700c-bf31-55485b34bab0",
  type: "page-type/page-type",
  slug: "restaurant-collection",
  definition: "a shelf of restaurants Alan keeps together",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
