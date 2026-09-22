import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spectresEye = {
  id: "019e668e-9a66-7d4b-b522-4ced6e272a4e",
  type: "page-type/temper-set",
  slug: "spectres-eye",
  title: "Spectre's Eye",
  key: "spectres-eye",
  esoSetId: 74,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
