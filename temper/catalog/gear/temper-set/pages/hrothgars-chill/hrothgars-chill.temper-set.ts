import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hrothgarsChill = {
  id: "019e66ec-7778-7406-95d6-4c25dea8599b",
  type: "page-type/temper-set",
  slug: "hrothgars-chill",
  title: "Hrothgar's Chill",
  key: "hrothgars-chill",
  esoSetId: 618,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
