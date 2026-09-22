import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const impregnableArmor = {
  id: "019e66ec-7791-7b37-a1ab-1a2550855033",
  type: "page-type/temper-set",
  slug: "impregnable-armor",
  title: "Impregnable Armor",
  key: "impregnable-armor",
  esoSetId: 334,
  category: "temper-set-category/pvp",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
