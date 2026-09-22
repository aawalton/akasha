import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const infernalGuardian = {
  id: "019e6484-5ffd-7eba-99d5-fbe17911d79c",
  type: "page-type/temper-set",
  slug: "infernal-guardian",
  title: "Infernal Guardian",
  key: "infernal-guardian",
  esoSetId: 272,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
