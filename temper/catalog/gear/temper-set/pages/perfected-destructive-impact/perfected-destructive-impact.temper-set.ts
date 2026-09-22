import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedDestructiveImpact = {
  id: "019e6484-5fbb-79a8-a260-9245e3b56d97",
  type: "page-type/temper-set",
  slug: "perfected-destructive-impact",
  title: "Perfected Destructive Impact",
  key: "perfected-destructive-impact",
  esoSetId: 532,
  category: "temper-set-category/arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
