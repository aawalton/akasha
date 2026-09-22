import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const falseGodsDevotion = {
  id: "019e66ec-7b22-7975-ba6b-a531670ceb50",
  type: "page-type/temper-set",
  slug: "false-gods-devotion",
  title: "False God's Devotion",
  key: "false-gods-devotion",
  esoSetId: 444,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
