import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const peaceAndSerenity = {
  id: "019e66ec-7be1-7705-a3e9-95204cfb9811",
  type: "page-type/temper-set",
  slug: "peace-and-serenity",
  title: "Peace and Serenity",
  key: "peace-and-serenity",
  esoSetId: 701,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
