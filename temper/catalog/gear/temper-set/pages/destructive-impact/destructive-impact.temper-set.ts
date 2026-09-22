import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const destructiveImpact = {
  id: "019e6484-5fa7-7b03-b3be-0db2cf7df240",
  type: "page-type/temper-set",
  slug: "destructive-impact",
  title: "Destructive Impact",
  key: "destructive-impact",
  esoSetId: 317,
  category: "temper-set-category/arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
