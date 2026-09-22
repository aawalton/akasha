import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ashenGrip = {
  id: "019e668e-9a36-7ae5-b98c-b140c60c3a9e",
  type: "page-type/temper-set",
  slug: "ashen-grip",
  title: "Ashen Grip",
  key: "ashen-grip",
  esoSetId: 54,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
