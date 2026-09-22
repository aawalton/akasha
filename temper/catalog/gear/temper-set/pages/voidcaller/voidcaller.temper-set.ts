import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const voidcaller = {
  id: "019e66e7-6aa9-7dcb-8aab-e65afd08ce04",
  type: "page-type/temper-set",
  slug: "voidcaller",
  title: "Voidcaller",
  key: "voidcaller",
  esoSetId: 537,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
