import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerItemAttack = {
  id: "01a0ca4d-7cbb-7525-bb4e-6f8865212c7f",
  type: "page-type/page-type",
  slug: "tower-item-attack",
  definition: "how much an item in the Tower adds to a strike",
  extends: ["page-type/metric-item"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
