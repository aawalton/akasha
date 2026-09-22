import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const jailersTenacity = {
  id: "019e66e6-a095-71f5-9991-324e5d231440",
  type: "page-type/temper-set",
  slug: "jailers-tenacity",
  title: "Jailer's Tenacity",
  key: "jailers-tenacity",
  esoSetId: 404,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
