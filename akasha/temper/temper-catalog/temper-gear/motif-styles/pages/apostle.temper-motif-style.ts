import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const apostle = {
  id: "01a05fd7-41d4-716c-873f-2c2585adefee",
  pageTypeSlug: "temper-motif-style",
  slug: "apostle",
  title: "Apostle",
  collectionIndex: 42,
  sourceDescription: "Dailies (Clockwork City)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
