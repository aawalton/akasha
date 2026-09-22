import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nocturnalsFavor = {
  id: "019e668e-9a58-7e92-8162-663ffb7be902",
  type: "page-type/temper-set",
  slug: "nocturnals-favor",
  title: "Nocturnal's Favor",
  key: "nocturnals-favor",
  esoSetId: 387,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
