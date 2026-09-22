import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const kraglensHowl = {
  id: "019e66e6-a09b-7baa-a527-7e04271d8675",
  type: "page-type/temper-set",
  slug: "kraglens-howl",
  title: "Kraglen's Howl",
  key: "kraglens-howl",
  esoSetId: 517,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
