import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const viciousSerpent = {
  id: "019e66ec-7eed-7382-a6d9-4a29e4c9c5f1",
  type: "page-type/temper-set",
  slug: "vicious-serpent",
  title: "Vicious Serpent",
  key: "vicious-serpent",
  esoSetId: 173,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
