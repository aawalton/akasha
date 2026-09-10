import type { PageType } from "@akasha/pages/page-type"

export const restaurantMenuItem = {
  id: "01a06807-be66-700d-8bc5-ae2909f1d723",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "restaurant-menu-item",
  definition: "a dish a restaurant serves",
  pluralSlug: "restaurant-menu-items",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
