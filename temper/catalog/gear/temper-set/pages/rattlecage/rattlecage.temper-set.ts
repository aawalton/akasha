import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const rattlecage = {
  id: "019e66e6-a0b4-71f8-9be4-c9dc54f1dbb0",
  type: "page-type/temper-set",
  slug: "rattlecage",
  title: "Rattlecage",
  key: "rattlecage",
  esoSetId: 311,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
