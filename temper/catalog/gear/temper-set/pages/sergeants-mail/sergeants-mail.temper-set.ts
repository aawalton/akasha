import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sergeantsMail = {
  id: "019e66e6-a0c0-72a3-82d6-fa3100a51eaf",
  type: "page-type/temper-set",
  slug: "sergeants-mail",
  title: "Sergeant's Mail",
  key: "sergeants-mail",
  esoSetId: 29,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
