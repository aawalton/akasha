import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const northernElsweyr = {
  id: "01a06165-cbbe-700c-a971-c9cbf7ae9d1a",
  pageTypeSlug: "temper-world-zone",
  slug: "northern-elsweyr",
  title: "Northern Elsweyr",
  esoZoneId: 1086,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
