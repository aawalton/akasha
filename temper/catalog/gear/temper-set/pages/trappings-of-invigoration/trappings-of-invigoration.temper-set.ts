import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const trappingsOfInvigoration = {
  id: "019e66e6-a0d9-7e49-aa22-036b7d30b757",
  type: "page-type/temper-set",
  slug: "trappings-of-invigoration",
  title: "Trappings of Invigoration",
  key: "trappings-of-invigoration",
  esoSetId: 344,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
