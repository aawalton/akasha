import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const pillarOfNirn = {
  id: "019e66e6-a0af-731f-97bc-65da8a8f3c43",
  type: "page-type/temper-set",
  slug: "pillar-of-nirn",
  title: "Pillar of Nirn",
  key: "pillar-of-nirn",
  esoSetId: 336,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
