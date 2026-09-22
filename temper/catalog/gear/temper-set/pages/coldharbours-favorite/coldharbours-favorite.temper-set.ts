import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const coldharboursFavorite = {
  id: "019e668e-9a3b-7084-9d38-41c74bbb3323",
  type: "page-type/temper-set",
  slug: "coldharbours-favorite",
  title: "Coldharbour's Favorite",
  key: "coldharbours-favorite",
  esoSetId: 437,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
