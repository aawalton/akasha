import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spellParasite = {
  id: "019e668e-9a67-7cb9-9b87-4ee35fadd35f",
  type: "page-type/temper-set",
  slug: "spell-parasite",
  title: "Spell Parasite",
  key: "spell-parasite",
  esoSetId: 506,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
