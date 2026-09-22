import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const macabreVintage = {
  id: "019e66e7-6a6c-7791-a85f-4d8c093a8e1c",
  type: "page-type/temper-set",
  slug: "macabre-vintage",
  title: "Macabre Vintage",
  key: "macabre-vintage",
  esoSetId: 758,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
