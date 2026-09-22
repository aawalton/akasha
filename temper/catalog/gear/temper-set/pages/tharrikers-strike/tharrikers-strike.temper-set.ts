import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const tharrikersStrike = {
  id: "019e668e-9a6b-78e1-b9fe-5f24c50aec4b",
  type: "page-type/temper-set",
  slug: "tharrikers-strike",
  title: "Tharriker's Strike",
  key: "tharrikers-strike",
  esoSetId: 763,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
