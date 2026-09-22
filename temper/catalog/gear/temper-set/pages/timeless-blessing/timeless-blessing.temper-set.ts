import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const timelessBlessing = {
  id: "019e66ec-7e92-74dd-8682-f75ea6d8a384",
  type: "page-type/temper-set",
  slug: "timeless-blessing",
  title: "Timeless Blessing",
  key: "timeless-blessing",
  esoSetId: 368,
  category: "temper-set-category/trial",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
