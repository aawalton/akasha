import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerItemDamage = {
  id: "01a0d3db-a090-77c7-8594-385d07210f90",
  type: "page-type/page-type",
  slug: "tower-item-damage",
  definition:
    "what a strike with an item in the Tower is worth before the strike is gated or grown",
  extends: ["page-type/metric-item"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
