import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const pirateSkeleton = {
  id: "019e6484-600f-7fd6-b7b5-358ee71a5570",
  type: "page-type/temper-set",
  slug: "pirate-skeleton",
  title: "Pirate Skeleton",
  key: "pirate-skeleton",
  esoSetId: 277,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
