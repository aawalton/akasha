import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const viciousDeath = {
  id: "019e66ec-79cf-73fc-aa20-8896ee6a8435",
  type: "page-type/temper-set",
  slug: "vicious-death",
  title: "Vicious Death",
  key: "vicious-death",
  esoSetId: 236,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
