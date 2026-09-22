import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hexSiphon = {
  id: "019e6484-5fb4-772d-81ca-4320128a2ddb",
  type: "page-type/temper-set",
  slug: "hex-siphon",
  title: "Hex Siphon",
  key: "hex-siphon",
  esoSetId: 542,
  category: "temper-set-category/arena",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
