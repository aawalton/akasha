import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const theArchMage = {
  id: "019e66ec-7961-758e-8853-612f3cbedabe",
  type: "page-type/temper-set",
  slug: "the-arch-mage",
  title: "The Arch-Mage",
  key: "the-arch-mage",
  esoSetId: 97,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
