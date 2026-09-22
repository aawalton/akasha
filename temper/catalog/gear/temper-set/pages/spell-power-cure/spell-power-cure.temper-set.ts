import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spellPowerCure = {
  id: "019e66e6-a0c5-78d4-b3b7-3be827a65f27",
  type: "page-type/temper-set",
  slug: "spell-power-cure",
  title: "Spell Power Cure",
  key: "spell-power-cure",
  esoSetId: 185,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
