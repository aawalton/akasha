import type { TemperSet } from "../../temper-set.page-type.ts"

export const chaoticWhirlwind = {
  id: "01a05fda-02fa-7bf3-8b4a-8c19ec6d967c",
  pageTypeSlug: "temper-set",
  slug: "chaotic-whirlwind",
  title: "Chaotic Whirlwind",
  key: "chaotic-whirlwind",
  esoSetId: 365,
  subcategoryId: "trial",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
