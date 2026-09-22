import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const rageOfTheUrsauk = {
  id: "019e66e6-a0b3-7090-9c84-4736a909e410",
  type: "page-type/temper-set",
  slug: "rage-of-the-ursauk",
  title: "Rage of the Ursauk",
  key: "rage-of-the-ursauk",
  esoSetId: 662,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
