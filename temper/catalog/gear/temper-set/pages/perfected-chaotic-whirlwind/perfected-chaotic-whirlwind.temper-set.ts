import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedChaoticWhirlwind = {
  id: "019e66ec-7c38-7b64-bca8-064c6c38377e",
  type: "page-type/temper-set",
  slug: "perfected-chaotic-whirlwind",
  title: "Perfected Chaotic Whirlwind",
  key: "perfected-chaotic-whirlwind",
  esoSetId: 359,
  category: "temper-set-category/trial",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
