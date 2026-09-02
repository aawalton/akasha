import type { TemperWorldZone } from "../../temper-world-zone.page-type.ts"

export const shadowfen = {
  id: "01a06165-cbbf-7004-847c-e4acf1aa1714",
  pageTypeSlug: "temper-world-zone",
  slug: "shadowfen",
  title: "Shadowfen",
  esoZoneId: 117,
  zoneQuests: "jsonl",
  pois: "jsonl",
  zoneCompletionActivities: "jsonl",
} as const satisfies TemperWorldZone
