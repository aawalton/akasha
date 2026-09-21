import type { TemperCadwellLevel } from "akasha/temper/catalog/pursuit/temper-cadwell-level/temper-cadwell-level.page-type.types.ts"

export const gold = {
  id: "01a0616b-2cde-7004-a0c9-76917492a6d9",
  type: "page-type/temper-cadwell-level",
  slug: "gold",
  title: "Gold",
  displayOrder: 2,
  cadwellStops: "jsonl",
} as const satisfies TemperCadwellLevel
