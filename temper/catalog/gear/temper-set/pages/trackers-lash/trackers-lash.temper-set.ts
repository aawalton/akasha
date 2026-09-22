import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const trackersLash = {
  id: "019e66ec-7998-7d77-8339-ffe5f60369ec",
  type: "page-type/temper-set",
  slug: "trackers-lash",
  title: "Tracker's Lash",
  key: "trackers-lash",
  esoSetId: 782,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
