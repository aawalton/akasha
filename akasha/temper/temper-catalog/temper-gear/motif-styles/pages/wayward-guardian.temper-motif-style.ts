import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const waywardGuardian = {
  id: "01a05fd7-41f0-7747-b414-fba3ed822593",
  pageTypeSlug: "temper-motif-style",
  slug: "wayward-guardian",
  title: "Wayward Guardian",
  collectionIndex: 82,
  sourceDescription: "Dailies from Ardanir (The Reach)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
