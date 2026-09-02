import type { TemperSet } from "../../temper-set.page-type.ts"

export const eagleEye = {
  id: "01a05fda-f7cd-72d2-b4d4-cdf7690ea18a",
  pageTypeSlug: "temper-set",
  slug: "eagle-eye",
  title: "Eagle Eye",
  key: "eagle-eye",
  esoSetId: 130,
  subcategoryId: "pvp",
  valid: ["jewelry:*", "bow", "inferno-staff", "ice-staff", "lightning-staff", "restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
