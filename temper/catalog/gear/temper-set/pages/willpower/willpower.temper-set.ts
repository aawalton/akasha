import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const willpower = {
  id: "019e66ec-79fc-7049-98d7-ba8363977a09",
  type: "page-type/temper-set",
  slug: "willpower",
  title: "Willpower",
  key: "willpower",
  esoSetId: 205,
  category: "temper-set-category/pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
