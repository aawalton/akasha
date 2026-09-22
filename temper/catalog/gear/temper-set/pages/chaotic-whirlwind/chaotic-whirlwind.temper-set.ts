import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const chaoticWhirlwind = {
  id: "019e66ec-7a7e-7fdb-8130-826ad69f596b",
  type: "page-type/temper-set",
  slug: "chaotic-whirlwind",
  title: "Chaotic Whirlwind",
  key: "chaotic-whirlwind",
  esoSetId: 365,
  category: "temper-set-category/trial",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
