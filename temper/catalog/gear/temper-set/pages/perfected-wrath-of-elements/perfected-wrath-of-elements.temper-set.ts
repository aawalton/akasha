import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedWrathOfElements = {
  id: "019e6484-5fcc-760e-92f3-1d4a3b92749f",
  type: "page-type/temper-set",
  slug: "perfected-wrath-of-elements",
  title: "Perfected Wrath of Elements",
  key: "perfected-wrath-of-elements",
  esoSetId: 567,
  category: "temper-set-category/arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
