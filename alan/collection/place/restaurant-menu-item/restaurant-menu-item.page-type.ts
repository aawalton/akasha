import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const restaurantMenuItem = {
  id: "01a06807-be66-700d-8bc5-ae2909f1d723",
  type: "page-type/page-type",
  slug: "restaurant-menu-item",
  definition: "a thing on the menu of a restaurant",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:17:35.972Z",
} as const satisfies PageType
