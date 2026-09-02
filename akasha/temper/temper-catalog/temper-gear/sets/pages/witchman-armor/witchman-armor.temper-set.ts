import type { TemperSet } from "../../temper-set.page-type.ts"

export const witchmanArmor = {
  id: "01a05fde-b3ce-7938-b81c-77b26eeb1643",
  pageTypeSlug: "temper-set",
  slug: "witchman-armor",
  title: "Witchman Armor",
  key: "witchman-armor",
  esoSetId: 20,
  subcategoryId: "overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
