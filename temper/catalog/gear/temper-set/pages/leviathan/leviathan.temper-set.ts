import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const leviathan = {
  id: "019e66e6-a09e-7e77-a4ee-eebf4398b2fa",
  type: "page-type/temper-set",
  slug: "leviathan",
  title: "Leviathan",
  key: "leviathan",
  esoSetId: 302,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
