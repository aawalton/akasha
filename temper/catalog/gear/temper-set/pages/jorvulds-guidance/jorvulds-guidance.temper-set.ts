import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const jorvuldsGuidance = {
  id: "019e66e6-a097-7515-a54b-c5e1f6270533",
  type: "page-type/temper-set",
  slug: "jorvulds-guidance",
  title: "Jorvuld's Guidance",
  key: "jorvulds-guidance",
  esoSetId: 346,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
