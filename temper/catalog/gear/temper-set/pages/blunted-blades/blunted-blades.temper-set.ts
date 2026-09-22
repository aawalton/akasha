import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bluntedBlades = {
  id: "019e66ec-767b-7b43-911b-a62d244d491b",
  type: "page-type/temper-set",
  slug: "blunted-blades",
  title: "Blunted Blades",
  key: "blunted-blades",
  esoSetId: 755,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
