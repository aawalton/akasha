import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const mawOfTheInfernal = {
  id: "019e6484-6006-7c48-95bd-4005c07e2f46",
  type: "page-type/temper-set",
  slug: "maw-of-the-infernal",
  title: "Maw of the Infernal",
  key: "maw-of-the-infernal",
  esoSetId: 170,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
