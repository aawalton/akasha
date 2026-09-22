import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stuhnsFavor = {
  id: "019e668e-9a68-7cce-913f-a9f1e0995883",
  type: "page-type/temper-set",
  slug: "stuhns-favor",
  title: "Stuhn's Favor",
  key: "stuhns-favor",
  esoSetId: 490,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
