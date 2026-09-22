import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lightSpeaker = {
  id: "019e66e6-a09f-7e46-a6bc-ee9684c1539b",
  type: "page-type/temper-set",
  slug: "light-speaker",
  title: "Light Speaker",
  key: "light-speaker",
  esoSetId: 298,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
