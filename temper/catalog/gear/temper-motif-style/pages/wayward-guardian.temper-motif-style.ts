import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const waywardGuardian = {
  id: "019e5a46-c471-7c69-b208-54b228318bea",
  type: "page-type/temper-motif-style",
  slug: "wayward-guardian",
  title: "Wayward Guardian",
  collectionIndex: 82,
  sourceDescription: "Dailies from Ardanir (The Reach)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
