import type { TemperSet } from "../../temper-set.page-type.ts"

export const gallantCharge = {
  id: "01a05fda-f7dc-7aac-9f16-6f073063063c",
  pageTypeSlug: "temper-set",
  slug: "gallant-charge",
  title: "Gallant Charge",
  key: "gallant-charge",
  esoSetId: 411,
  subcategoryId: "arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
