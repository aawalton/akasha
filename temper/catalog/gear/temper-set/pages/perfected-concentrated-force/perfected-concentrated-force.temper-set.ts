import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedConcentratedForce = {
  id: "019e66ec-7c55-707b-9b3f-f8b89f5e5604",
  type: "page-type/temper-set",
  slug: "perfected-concentrated-force",
  title: "Perfected Concentrated Force",
  key: "perfected-concentrated-force",
  esoSetId: 361,
  category: "temper-set-category/trial",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
