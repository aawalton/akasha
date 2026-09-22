import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const mightyGlacier = {
  id: "019e66e6-a0a4-774e-8b34-7789b03cfd27",
  type: "page-type/temper-set",
  slug: "mighty-glacier",
  title: "Mighty Glacier",
  key: "mighty-glacier",
  esoSetId: 429,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
