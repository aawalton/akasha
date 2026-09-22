import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wildImpulse = {
  id: "019e6484-5fd9-7e92-aa16-0c3ca1b78321",
  type: "page-type/temper-set",
  slug: "wild-impulse",
  title: "Wild Impulse",
  key: "wild-impulse",
  esoSetId: 415,
  category: "temper-set-category/arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
