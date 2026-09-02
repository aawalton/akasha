import type { TemperSet } from "../../temper-set.page-type.ts"

export const armorMaster = {
  id: "01a05fda-02e4-70df-8bf1-90244ee781d5",
  pageTypeSlug: "temper-set",
  slug: "armor-master",
  title: "Armor Master",
  key: "armor-master",
  esoSetId: 178,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
