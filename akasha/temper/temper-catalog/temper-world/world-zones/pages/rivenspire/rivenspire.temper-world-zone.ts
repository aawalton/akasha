import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const rivenspire = {
  id: "01a06165-cbbe-700e-82b9-fb00e539477a",
  pageTypeSlug: "temper-world-zone",
  slug: "rivenspire",
  title: "Rivenspire",
  esoZoneId: 20,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
