import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const daedricTrickery = {
  id: "019e668e-9a3c-7ba1-9d36-703bdcbe0c50",
  type: "page-type/temper-set",
  slug: "daedric-trickery",
  title: "Daedric Trickery",
  key: "daedric-trickery",
  esoSetId: 324,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
