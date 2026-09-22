import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const plagueDoctor = {
  id: "019e66e7-6a79-7c9b-bf63-853a6cb57807",
  type: "page-type/temper-set",
  slug: "plague-doctor",
  title: "Plague Doctor",
  key: "plague-doctor",
  esoSetId: 293,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
