import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const highIsle = {
  id: "01a06165-cbbe-7002-9039-fc7227fdc98e",
  pageTypeSlug: "temper-world-zone",
  slug: "high-isle",
  title: "High Isle",
  esoZoneId: 1318,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
