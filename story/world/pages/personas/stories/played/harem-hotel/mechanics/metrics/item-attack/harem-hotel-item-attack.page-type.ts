import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelItemAttack = {
  id: "01a0de4b-6980-788b-a07f-eb4235b4505f",
  type: "page-type/page-type",
  slug: "harem-hotel-item-attack",
  definition: "how much an item in the Harem Hotel adds to a strike",
  extends: ["page-type/metric-item"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
