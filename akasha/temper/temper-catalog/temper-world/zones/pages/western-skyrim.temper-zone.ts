import type { TemperZone } from "../temper-zone.page-type.ts"

export const westernSkyrim = {
  id: "01a05fc5-1697-74ca-a926-38e5e32f94b5",
  pageTypeSlug: "temper-zone",
  slug: "western-skyrim",
  title: "Western Skyrim",
  dropsScripts: true,
  isDlc: true,
} as const satisfies TemperZone
