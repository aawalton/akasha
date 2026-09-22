import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const theBlind = {
  id: "019e6484-601e-7086-ade9-8811453e87ee",
  type: "page-type/temper-set",
  slug: "the-blind",
  title: "The Blind",
  key: "the-blind",
  esoSetId: 738,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
