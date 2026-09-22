import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const oblivionsEdge = {
  id: "019e66e6-a0aa-7f0b-a040-70cd77ca65f5",
  type: "page-type/temper-set",
  slug: "oblivions-edge",
  title: "Oblivion's Edge",
  key: "oblivions-edge",
  esoSetId: 91,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
