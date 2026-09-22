import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hawksEye = {
  id: "019e66ec-775e-78af-9f85-3fffbdb0411d",
  type: "page-type/temper-set",
  slug: "hawks-eye",
  title: "Hawk's Eye",
  key: "hawks-eye",
  esoSetId: 100,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
