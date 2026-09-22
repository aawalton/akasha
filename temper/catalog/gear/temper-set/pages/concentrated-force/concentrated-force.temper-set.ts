import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const concentratedForce = {
  id: "019e66ec-7a9e-7489-bbe0-1ffc779498e8",
  type: "page-type/temper-set",
  slug: "concentrated-force",
  title: "Concentrated Force",
  key: "concentrated-force",
  esoSetId: 367,
  category: "temper-set-category/trial",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
