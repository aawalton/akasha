import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const graveGuardian = {
  id: "019e66e6-a085-73d3-a738-41ff778f2208",
  type: "page-type/temper-set",
  slug: "grave-guardian",
  title: "Grave Guardian",
  key: "grave-guardian",
  esoSetId: 476,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
