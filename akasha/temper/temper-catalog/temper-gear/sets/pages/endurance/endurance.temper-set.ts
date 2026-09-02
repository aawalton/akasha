import type { TemperSet } from "../../temper-set.page-type.ts"

export const endurance = {
  id: "01a05fda-f7d0-788d-ad51-c13a1f27059e",
  pageTypeSlug: "temper-set",
  slug: "endurance",
  title: "Endurance",
  key: "endurance",
  esoSetId: 204,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
