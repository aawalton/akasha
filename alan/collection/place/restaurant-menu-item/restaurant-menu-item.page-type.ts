import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const restaurantMenuItem = {
  id: "01a06807-be66-700d-8bc5-ae2909f1d723",
  type: "page-type/page-type",
  slug: "restaurant-menu-item",
  definition: "a dish a restaurant serves",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
