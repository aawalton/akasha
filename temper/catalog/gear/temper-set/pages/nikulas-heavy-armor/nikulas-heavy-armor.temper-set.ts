import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nikulasHeavyArmor = {
  id: "019e66e6-a0a7-7a85-989a-f4784908d789",
  type: "page-type/temper-set",
  slug: "nikulas-heavy-armor",
  title: "Nikulas' Heavy Armor",
  key: "nikulas-heavy-armor",
  esoSetId: 72,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
