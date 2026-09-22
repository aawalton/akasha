import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const destructiveMage = {
  id: "019e66ec-7ad9-7558-96e1-c909120973af",
  type: "page-type/temper-set",
  slug: "destructive-mage",
  title: "Destructive Mage",
  key: "destructive-mage",
  esoSetId: 140,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
