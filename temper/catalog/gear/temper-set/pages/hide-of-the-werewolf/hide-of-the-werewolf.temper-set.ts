import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hideOfTheWerewolf = {
  id: "019e66e7-6a68-7d59-a4bb-0216587b23f3",
  type: "page-type/temper-set",
  slug: "hide-of-the-werewolf",
  title: "Hide of the Werewolf",
  key: "hide-of-the-werewolf",
  esoSetId: 58,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
