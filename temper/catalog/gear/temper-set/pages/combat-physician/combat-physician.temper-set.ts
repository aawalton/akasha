import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const combatPhysician = {
  id: "019e66e6-a069-7947-b9ad-a19834973b1c",
  type: "page-type/temper-set",
  slug: "combat-physician",
  title: "Combat Physician",
  key: "combat-physician",
  esoSetId: 194,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
