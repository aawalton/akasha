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
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-09-15T15:36:18.000Z",
} as const satisfies PageType
