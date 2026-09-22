import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const dreamersMantle = {
  id: "019e66e7-6a5a-7731-b67f-2b3e78d51ee1",
  type: "page-type/temper-set",
  slug: "dreamers-mantle",
  title: "Dreamer's Mantle",
  key: "dreamers-mantle",
  esoSetId: 22,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
