import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const imperialPhysique = {
  id: "019e66ec-7785-70ad-bd7a-7bd02f6eba38",
  type: "page-type/temper-set",
  slug: "imperial-physique",
  title: "Imperial Physique",
  key: "imperial-physique",
  esoSetId: 253,
  category: "temper-set-category/pvp",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
