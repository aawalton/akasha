import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const elementalSuccession = {
  id: "019e6484-5fa9-7498-a3d1-0deb1cf2af01",
  type: "page-type/temper-set",
  slug: "elemental-succession",
  title: "Elemental Succession",
  key: "elemental-succession",
  esoSetId: 215,
  category: "temper-set-category/arena",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
