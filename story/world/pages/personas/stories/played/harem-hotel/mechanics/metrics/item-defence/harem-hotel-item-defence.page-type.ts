import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelItemDefence = {
  id: "01a0de4b-6980-7978-8c15-f963b33de205",
  type: "page-type/page-type",
  slug: "harem-hotel-item-defence",
  definition: "how much an item in the Harem Hotel adds to turning a blow aside",
  extends: ["page-type/metric-item"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
