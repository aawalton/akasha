import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const powerfulAssault = {
  id: "019e66ec-7877-7535-85fb-52bd0274a2be",
  type: "page-type/temper-set",
  slug: "powerful-assault",
  title: "Powerful Assault",
  key: "powerful-assault",
  esoSetId: 180,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
