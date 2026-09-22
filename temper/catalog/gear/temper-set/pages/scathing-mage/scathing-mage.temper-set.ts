import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const scathingMage = {
  id: "019e66e6-a0bc-7f4f-b296-9fbda438d9aa",
  type: "page-type/temper-set",
  slug: "scathing-mage",
  title: "Scathing Mage",
  key: "scathing-mage",
  esoSetId: 190,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
