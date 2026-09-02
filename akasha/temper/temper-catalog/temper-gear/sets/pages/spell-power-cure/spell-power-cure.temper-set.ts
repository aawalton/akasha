import type { TemperSet } from "../../temper-set.page-type.ts"

export const spellPowerCure = {
  id: "01a05fdc-973e-77a6-895e-8d29f5c61b5e",
  pageTypeSlug: "temper-set",
  slug: "spell-power-cure",
  title: "Spell Power Cure",
  key: "spell-power-cure",
  esoSetId: 185,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
