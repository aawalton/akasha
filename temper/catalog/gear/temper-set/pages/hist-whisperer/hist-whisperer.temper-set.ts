import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const histWhisperer = {
  id: "019e668e-9a49-7c43-9da7-5ed1b607b626",
  type: "page-type/temper-set",
  slug: "hist-whisperer",
  title: "Hist Whisperer",
  key: "hist-whisperer",
  esoSetId: 582,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
