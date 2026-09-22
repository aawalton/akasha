import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const ebonshadow = {
  id: "019e5a46-c403-7fa5-800f-4f93759d1d2a",
  type: "page-type/temper-motif-style",
  slug: "ebonshadow",
  title: "Ebonshadow",
  collectionIndex: 43,
  sourceDescription: "Blackfeather Court Tributes (Clockwork City)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
