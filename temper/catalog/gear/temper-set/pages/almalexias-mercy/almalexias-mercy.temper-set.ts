import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const almalexiasMercy = {
  id: "019e66ec-7619-7288-a64d-1d9b50d98e01",
  type: "page-type/temper-set",
  slug: "almalexias-mercy",
  title: "Almalexia's Mercy",
  key: "almalexias-mercy",
  esoSetId: 85,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
