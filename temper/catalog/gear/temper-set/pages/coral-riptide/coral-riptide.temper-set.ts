import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const coralRiptide = {
  id: "019e66ec-7aac-7c31-b0c9-2b463831b951",
  type: "page-type/temper-set",
  slug: "coral-riptide",
  title: "Coral Riptide",
  key: "coral-riptide",
  esoSetId: 647,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
