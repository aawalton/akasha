import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hatchlingsShell = {
  id: "019e66e7-6a65-738c-9f4e-d94461f7fc4b",
  type: "page-type/temper-set",
  slug: "hatchlings-shell",
  title: "Hatchling's Shell",
  key: "hatchlings-shell",
  esoSetId: 62,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
