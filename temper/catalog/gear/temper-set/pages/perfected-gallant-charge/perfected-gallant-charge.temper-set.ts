import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedGallantCharge = {
  id: "019e6484-5fbe-7d9b-9c75-e249417f0362",
  type: "page-type/temper-set",
  slug: "perfected-gallant-charge",
  title: "Perfected Gallant Charge",
  key: "perfected-gallant-charge",
  esoSetId: 423,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
