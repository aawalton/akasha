import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const savageWerewolf = {
  id: "019e66e6-a0bb-7e39-84b0-d65b08178fe1",
  type: "page-type/temper-set",
  slug: "savage-werewolf",
  title: "Savage Werewolf",
  key: "savage-werewolf",
  esoSetId: 403,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
