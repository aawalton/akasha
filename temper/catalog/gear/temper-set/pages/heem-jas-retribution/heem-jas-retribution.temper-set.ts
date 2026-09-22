import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const heemJasRetribution = {
  id: "019e66e6-a08d-7a90-a05e-a469b383adb5",
  type: "page-type/temper-set",
  slug: "heem-jas-retribution",
  title: "Heem-Jas' Retribution",
  key: "heem-jas-retribution",
  esoSetId: 259,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
