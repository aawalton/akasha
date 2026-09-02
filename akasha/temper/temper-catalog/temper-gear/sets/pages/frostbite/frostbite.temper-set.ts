import type { TemperSet } from "../../temper-set.page-type.ts"

export const frostbite = {
  id: "01a05fda-f7da-7e3e-80fa-b813a57cbc84",
  pageTypeSlug: "temper-set",
  slug: "frostbite",
  title: "Frostbite",
  key: "frostbite",
  esoSetId: 579,
  subcategoryId: "overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
