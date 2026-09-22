import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerLevel = {
  id: "01a0ca39-5f14-7739-9c6a-7e0e48d7e818",
  type: "page-type/page-type",
  slug: "tower-level",
  definition: "how far a character in the Tower has come",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
