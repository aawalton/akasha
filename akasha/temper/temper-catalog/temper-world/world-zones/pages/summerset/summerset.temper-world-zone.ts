import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const summerset = {
  id: "01a06165-cbbf-700b-84af-a901d4278eaf",
  pageTypeSlug: "temper-world-zone",
  slug: "summerset",
  title: "Summerset",
  esoZoneId: 1011,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
