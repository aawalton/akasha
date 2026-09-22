import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const alessiasBulwark = {
  id: "019e668e-9a32-7370-9df7-cea170ae527d",
  type: "page-type/temper-set",
  slug: "alessias-bulwark",
  title: "Alessia's Bulwark",
  key: "alessias-bulwark",
  esoSetId: 82,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
