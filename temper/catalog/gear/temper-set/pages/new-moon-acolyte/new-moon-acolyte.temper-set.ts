import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const newMoonAcolyte = {
  id: "019e668e-9a55-7678-a889-4138d8dae981",
  type: "page-type/temper-set",
  slug: "new-moon-acolyte",
  title: "New Moon Acolyte",
  key: "new-moon-acolyte",
  esoSetId: 470,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
