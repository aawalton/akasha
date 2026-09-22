import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vastariesTutelage = {
  id: "019e668e-9a73-79c9-b6d2-64bd85a65bfc",
  type: "page-type/temper-set",
  slug: "vastaries-tutelage",
  title: "Vastarie's Tutelage",
  key: "vastaries-tutelage",
  esoSetId: 439,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
