import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bastionOfTheDraoife = {
  id: "019e66e7-6a46-708e-ab2b-0c97e970a9e2",
  type: "page-type/temper-set",
  slug: "bastion-of-the-draoife",
  title: "Bastion of the Draoife",
  key: "bastion-of-the-draoife",
  esoSetId: 673,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
