import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armorOfTheTrainee = {
  id: "019e66e7-6a40-7032-8ab2-83992af66c94",
  type: "page-type/temper-set",
  slug: "armor-of-the-trainee",
  title: "Armor of the Trainee",
  key: "armor-of-the-trainee",
  esoSetId: 281,
  category: "temper-set-category/overland",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
