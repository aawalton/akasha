import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const twiceFangedSerpent = {
  id: "019e66ec-7ebf-7796-a304-b5a51b852574",
  type: "page-type/temper-set",
  slug: "twice-fanged-serpent",
  title: "Twice-Fanged Serpent",
  key: "twice-fanged-serpent",
  esoSetId: 144,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
