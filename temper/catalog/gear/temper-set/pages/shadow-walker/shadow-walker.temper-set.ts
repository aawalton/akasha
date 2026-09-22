import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shadowWalker = {
  id: "019e66ec-78d7-72fd-8318-6c4500895be1",
  type: "page-type/temper-set",
  slug: "shadow-walker",
  title: "Shadow Walker",
  key: "shadow-walker",
  esoSetId: 67,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
