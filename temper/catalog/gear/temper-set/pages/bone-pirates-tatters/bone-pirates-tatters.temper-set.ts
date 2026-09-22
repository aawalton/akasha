import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bonePiratesTatters = {
  id: "019e66e6-a064-7782-aaab-f78e05ab34ab",
  type: "page-type/temper-set",
  slug: "bone-pirates-tatters",
  title: "Bone Pirate's Tatters",
  key: "bone-pirates-tatters",
  esoSetId: 308,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
