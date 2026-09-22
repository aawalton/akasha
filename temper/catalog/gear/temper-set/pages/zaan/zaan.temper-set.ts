import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const zaan = {
  id: "019e6484-6024-7bdf-9c36-548ec92d46ea",
  type: "page-type/temper-set",
  slug: "zaan",
  title: "Zaan",
  key: "zaan",
  esoSetId: 350,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
