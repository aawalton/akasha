import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const barkskin = {
  id: "019e66e6-a05f-7706-b798-a9a6bf86c2f6",
  type: "page-type/temper-set",
  slug: "barkskin",
  title: "Barkskin",
  key: "barkskin",
  esoSetId: 28,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
