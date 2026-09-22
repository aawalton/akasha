import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ulfnorsFavor = {
  id: "019e66e6-a0df-777d-871a-c914dec9c539",
  type: "page-type/temper-set",
  slug: "ulfnors-favor",
  title: "Ulfnor's Favor",
  key: "ulfnors-favor",
  esoSetId: 345,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
