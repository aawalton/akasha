import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spawnOfMephala = {
  id: "019e6484-6018-760d-a1f8-6c5bbe40f530",
  type: "page-type/temper-set",
  slug: "spawn-of-mephala",
  title: "Spawn of Mephala",
  key: "spawn-of-mephala",
  esoSetId: 162,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
