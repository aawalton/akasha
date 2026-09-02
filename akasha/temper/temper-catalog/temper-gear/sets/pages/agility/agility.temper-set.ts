import type { TemperSet } from "../../temper-set.page-type.ts"

export const agility = {
  id: "01a05fda-02df-7ff6-b0e9-c9cd282d8087",
  pageTypeSlug: "temper-set",
  slug: "agility",
  title: "Agility",
  key: "agility",
  esoSetId: 206,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
