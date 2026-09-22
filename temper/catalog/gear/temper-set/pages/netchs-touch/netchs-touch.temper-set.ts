import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const netchsTouch = {
  id: "019e66e6-a0a6-7970-a904-f20aec092c31",
  type: "page-type/temper-set",
  slug: "netchs-touch",
  title: "Netch's Touch",
  key: "netchs-touch",
  esoSetId: 300,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
