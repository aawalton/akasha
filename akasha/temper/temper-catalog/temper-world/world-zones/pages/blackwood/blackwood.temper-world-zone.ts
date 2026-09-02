import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const blackwood = {
  id: "01a06165-cbbc-7004-a17c-e3842c8ead50",
  pageTypeSlug: "temper-world-zone",
  slug: "blackwood",
  title: "Blackwood",
  esoZoneId: 1261,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
