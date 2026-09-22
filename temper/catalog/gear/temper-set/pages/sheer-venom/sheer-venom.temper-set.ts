import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sheerVenom = {
  id: "019e66e6-a0c1-747a-b4a2-89316e9bee4c",
  type: "page-type/temper-set",
  slug: "sheer-venom",
  title: "Sheer Venom",
  key: "sheer-venom",
  esoSetId: 195,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
