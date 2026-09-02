import type { TemperSet } from "../../temper-set.page-type.ts"

export const willpower = {
  id: "01a05fde-b3cc-7c06-b19a-eae15aa4f498",
  pageTypeSlug: "temper-set",
  slug: "willpower",
  title: "Willpower",
  key: "willpower",
  esoSetId: 205,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
