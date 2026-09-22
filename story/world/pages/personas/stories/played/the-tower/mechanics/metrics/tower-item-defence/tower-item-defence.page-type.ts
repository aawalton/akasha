import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerItemDefence = {
  id: "01a0ca4d-8df4-723b-8872-08aa0a5614c0",
  type: "page-type/page-type",
  slug: "tower-item-defence",
  definition: "how much an item in the Tower adds to turning a blow aside",
  extends: ["page-type/metric-item"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
