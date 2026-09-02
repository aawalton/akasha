import type { TemperSet } from "../../temper-set.page-type.ts"

export const graceOfTheAncients = {
  id: "01a05fda-f7df-7efd-b0f3-27c63b9d1d75",
  pageTypeSlug: "temper-set",
  slug: "grace-of-the-ancients",
  title: "Grace of the Ancients",
  key: "grace-of-the-ancients",
  esoSetId: 126,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
