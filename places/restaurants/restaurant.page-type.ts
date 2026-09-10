import type { PageType } from "@akasha/pages/page-type"

export const restaurant = {
  id: "01a06807-be66-700b-be52-bd042c86fc17",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "restaurant",
  definition: "a place Alan eats at",
  pluralSlug: "restaurants",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
