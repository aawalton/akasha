import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const thunderousVolley = {
  id: "019e6484-5fd6-7375-bd04-32ac6393c747",
  type: "page-type/temper-set",
  slug: "thunderous-volley",
  title: "Thunderous Volley",
  key: "thunderous-volley",
  esoSetId: 372,
  category: "temper-set-category/arena",
  valid: ["bow"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
