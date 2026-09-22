import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const madTinkerer = {
  id: "019e66e7-6a6d-7c44-97ab-9ff9faba3f49",
  type: "page-type/temper-set",
  slug: "mad-tinkerer",
  title: "Mad Tinkerer",
  key: "mad-tinkerer",
  esoSetId: 354,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
