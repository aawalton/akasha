import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const phylacterysGrasp = {
  id: "019e66e6-a0ae-722d-a920-5c4cb7622d93",
  type: "page-type/temper-set",
  slug: "phylacterys-grasp",
  title: "Phylactery's Grasp",
  key: "phylacterys-grasp",
  esoSetId: 665,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
