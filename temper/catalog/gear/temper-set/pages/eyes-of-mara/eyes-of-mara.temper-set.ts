import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const eyesOfMara = {
  id: "019e668e-9a44-79c1-aae2-c9d79c2f0eae",
  type: "page-type/temper-set",
  slug: "eyes-of-mara",
  title: "Eyes of Mara",
  key: "eyes-of-mara",
  esoSetId: 87,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
