import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lustrousSoulwell = {
  id: "019e66e7-6a10-79b8-a41e-a8bc639ef161",
  type: "page-type/temper-set",
  slug: "lustrous-soulwell",
  title: "Lustrous Soulwell",
  key: "lustrous-soulwell",
  esoSetId: 822,
  category: "temper-set-category/no-type",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
