import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerStamina = {
  id: "01a0c9d4-f409-77dd-b9df-5575d1f8d994",
  type: "page-type/page-type",
  slug: "tower-stamina",
  definition: "the vigour a character in the Tower has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
