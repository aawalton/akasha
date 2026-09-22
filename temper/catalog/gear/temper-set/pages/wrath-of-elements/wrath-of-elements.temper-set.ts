import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wrathOfElements = {
  id: "019e6484-5fdb-7bcc-afb4-4d41c351d65e",
  type: "page-type/temper-set",
  slug: "wrath-of-elements",
  title: "Wrath of Elements",
  key: "wrath-of-elements",
  esoSetId: 561,
  category: "temper-set-category/arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
