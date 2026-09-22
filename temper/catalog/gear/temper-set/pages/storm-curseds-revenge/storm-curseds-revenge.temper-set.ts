import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stormCursedsRevenge = {
  id: "019e66e6-a0ca-7de4-8196-4a35b2002c33",
  type: "page-type/temper-set",
  slug: "storm-curseds-revenge",
  title: "Storm-Cursed's Revenge",
  key: "storm-curseds-revenge",
  esoSetId: 623,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
