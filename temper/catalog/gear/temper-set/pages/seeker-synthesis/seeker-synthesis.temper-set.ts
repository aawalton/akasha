import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const seekerSynthesis = {
  id: "019e668e-9a5f-7c09-8ed4-c516626f0923",
  type: "page-type/temper-set",
  slug: "seeker-synthesis",
  title: "Seeker Synthesis",
  key: "seeker-synthesis",
  esoSetId: 697,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
