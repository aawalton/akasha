import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerMana = {
  id: "01a0c9d4-c7da-77c4-9f49-c9efea20881a",
  type: "page-type/page-type",
  slug: "tower-mana",
  definition: "the magic a character in the Tower has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T15:56:00.346Z",
  updatedAt: "2026-09-22T18:06:44.000Z",
} as const satisfies PageType
