import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nobleDuelistsSilks = {
  id: "019e66e6-a0a9-7d4e-9eba-17e903746126",
  type: "page-type/temper-set",
  slug: "noble-duelists-silks",
  title: "Noble Duelist's Silks",
  key: "noble-duelists-silks",
  esoSetId: 46,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
