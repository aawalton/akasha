import type { TemperSet } from "../../temper-set.page-type.ts"

export const wrathOfElements = {
  id: "01a05fde-b3cf-7774-b7c9-b591e0dc839d",
  pageTypeSlug: "temper-set",
  slug: "wrath-of-elements",
  title: "Wrath of Elements",
  key: "wrath-of-elements",
  esoSetId: 561,
  subcategoryId: "arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
