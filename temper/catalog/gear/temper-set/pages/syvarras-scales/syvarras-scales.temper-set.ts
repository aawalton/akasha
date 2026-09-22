import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const syvarrasScales = {
  id: "019e66e7-6a9d-710d-966e-c48574701466",
  type: "page-type/temper-set",
  slug: "syvarras-scales",
  title: "Syvarra's Scales",
  key: "syvarras-scales",
  esoSetId: 228,
  category: "temper-set-category/overland",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
