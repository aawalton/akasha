import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const glorgolochTheDestroyer = {
  id: "019e6484-5ff8-70eb-9d0a-31724d8a7fd0",
  type: "page-type/temper-set",
  slug: "glorgoloch-the-destroyer",
  title: "Glorgoloch the Destroyer",
  key: "glorgoloch-the-destroyer",
  esoSetId: 600,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
