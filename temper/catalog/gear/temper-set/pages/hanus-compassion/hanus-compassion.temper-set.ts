import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hanusCompassion = {
  id: "019e66e6-a08b-7940-ac31-5d4fbdfc1116",
  type: "page-type/temper-set",
  slug: "hanus-compassion",
  title: "Hanu's Compassion",
  key: "hanus-compassion",
  esoSetId: 399,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
