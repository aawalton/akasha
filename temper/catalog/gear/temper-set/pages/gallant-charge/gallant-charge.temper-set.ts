import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const gallantCharge = {
  id: "019e6484-5fb0-787e-b53f-f6e970161ac3",
  type: "page-type/temper-set",
  slug: "gallant-charge",
  title: "Gallant Charge",
  key: "gallant-charge",
  esoSetId: 411,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
