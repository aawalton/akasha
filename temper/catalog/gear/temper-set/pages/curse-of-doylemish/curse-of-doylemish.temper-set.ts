import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const curseOfDoylemish = {
  id: "019e66e6-a06d-7a30-95a8-65944f4d7256",
  type: "page-type/temper-set",
  slug: "curse-of-doylemish",
  title: "Curse of Doylemish",
  key: "curse-of-doylemish",
  esoSetId: 348,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
