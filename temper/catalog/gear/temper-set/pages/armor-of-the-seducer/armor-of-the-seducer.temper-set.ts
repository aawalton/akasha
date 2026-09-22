import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armorOfTheSeducer = {
  id: "019e668e-9a35-7ce6-b0bf-86ac1bdafcf9",
  type: "page-type/temper-set",
  slug: "armor-of-the-seducer",
  title: "Armor of the Seducer",
  key: "armor-of-the-seducer",
  esoSetId: 43,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
