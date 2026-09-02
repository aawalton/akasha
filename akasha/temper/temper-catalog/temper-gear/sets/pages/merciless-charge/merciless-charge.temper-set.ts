import type { TemperSet } from "../../temper-set.page-type.ts"

export const mercilessCharge = {
  id: "01a05fdb-7d3e-707a-bfe3-866c2bfdbdd0",
  pageTypeSlug: "temper-set",
  slug: "merciless-charge",
  title: "Merciless Charge",
  key: "merciless-charge",
  esoSetId: 369,
  subcategoryId: "arena",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
