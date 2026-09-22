import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const embershield = {
  id: "019e66e6-a07c-7e33-a10a-7248690b441c",
  type: "page-type/temper-set",
  slug: "embershield",
  title: "Embershield",
  key: "embershield",
  esoSetId: 158,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
