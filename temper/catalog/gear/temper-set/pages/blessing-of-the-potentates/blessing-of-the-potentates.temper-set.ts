import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const blessingOfThePotentates = {
  id: "019e66ec-766f-7a86-8564-a64d14c4d7c4",
  type: "page-type/temper-set",
  slug: "blessing-of-the-potentates",
  title: "Blessing of the Potentates",
  key: "blessing-of-the-potentates",
  esoSetId: 128,
  category: "temper-set-category/pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
