import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const clockworkCity = {
  id: "01a06165-cbbc-7007-b272-b48e50cf2ceb",
  pageTypeSlug: "temper-world-zone",
  slug: "clockwork-city",
  title: "Clockwork City",
  esoZoneId: 980,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
