import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const greymoor = {
  id: "01a05fd7-41e0-79a0-9b5b-896e57e6b99b",
  pageTypeSlug: "temper-motif-style",
  slug: "greymoor",
  title: "Greymoor",
  collectionIndex: 70,
  sourceDescription: "Harrowstorm dailies (Western Skyrim)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
