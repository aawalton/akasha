import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const gardenerOfSeasons = {
  id: "019e6484-5fe1-7eef-a50e-ad3fa62701fb",
  type: "page-type/temper-set",
  slug: "gardener-of-seasons",
  title: "Gardener of Seasons",
  key: "gardener-of-seasons",
  esoSetId: 729,
  category: "temper-set-category/class-set",
  valid: ["*"],
  classId: "temper-class/warden",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
