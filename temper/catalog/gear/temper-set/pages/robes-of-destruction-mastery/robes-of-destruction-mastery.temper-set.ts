import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const robesOfDestructionMastery = {
  id: "019e6484-5fd3-7704-bf1b-875b00055bd7",
  type: "page-type/temper-set",
  slug: "robes-of-destruction-mastery",
  title: "Robes of Destruction Mastery",
  key: "robes-of-destruction-mastery",
  esoSetId: 88,
  category: "temper-set-category/arena",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
