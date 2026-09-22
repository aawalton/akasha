import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const corpseburster = {
  id: "019e6484-5fe0-7edb-82e0-ca0b3d2c4fe9",
  type: "page-type/temper-set",
  slug: "corpseburster",
  title: "Corpseburster",
  key: "corpseburster",
  esoSetId: 777,
  category: "temper-set-category/class-set",
  valid: ["*"],
  classId: "temper-class/necromancer",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
