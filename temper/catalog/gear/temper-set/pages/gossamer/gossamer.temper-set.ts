import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const gossamer = {
  id: "019e66e6-a084-72cf-9272-e2e9734e3aef",
  type: "page-type/temper-set",
  slug: "gossamer",
  title: "Gossamer",
  key: "gossamer",
  esoSetId: 261,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
