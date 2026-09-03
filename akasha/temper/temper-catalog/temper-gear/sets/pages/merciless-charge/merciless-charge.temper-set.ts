import type { TemperSet } from "../../temper-set.page-type.ts"

export const mercilessCharge = {
  id: "019e6484-5fb7-736c-b2cf-dd661947d615",
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
