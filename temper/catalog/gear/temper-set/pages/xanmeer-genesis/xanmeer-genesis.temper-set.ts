import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const xanmeerGenesis = {
  id: "019e66e7-6a2a-70fa-a50d-76c54cb3cc58",
  type: "page-type/temper-set",
  slug: "xanmeer-genesis",
  title: "Xanmeer Genesis",
  key: "xanmeer-genesis",
  esoSetId: 846,
  category: "temper-set-category/no-type",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
