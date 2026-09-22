import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedRadialUppercut = {
  id: "019e6484-5fc4-7b10-bb06-b1c412626649",
  type: "page-type/temper-set",
  slug: "perfected-radial-uppercut",
  title: "Perfected Radial Uppercut",
  key: "perfected-radial-uppercut",
  esoSetId: 424,
  category: "temper-set-category/arena",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
