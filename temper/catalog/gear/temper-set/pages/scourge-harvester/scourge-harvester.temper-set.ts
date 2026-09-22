import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const scourgeHarvester = {
  id: "019e6484-6012-7cbf-a3d0-7329da41c373",
  type: "page-type/temper-set",
  slug: "scourge-harvester",
  title: "Scourge Harvester",
  key: "scourge-harvester",
  esoSetId: 165,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
