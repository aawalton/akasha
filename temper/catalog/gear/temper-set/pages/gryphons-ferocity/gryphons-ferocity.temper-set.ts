import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const gryphonsFerocity = {
  id: "019e66e7-6a64-7000-aaf3-8090cee05cb1",
  type: "page-type/temper-set",
  slug: "gryphons-ferocity",
  title: "Gryphon's Ferocity",
  key: "gryphons-ferocity",
  esoSetId: 383,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
