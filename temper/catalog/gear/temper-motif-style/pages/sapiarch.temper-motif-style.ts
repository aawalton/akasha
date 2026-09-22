import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const sapiarch = {
  id: "019e5a46-c40e-79cb-8aa9-3a4a9eb6fa76",
  type: "page-type/temper-motif-style",
  slug: "sapiarch",
  title: "Sapiarch",
  collectionIndex: 48,
  sourceDescription: "Divine Prosecution dailies (Summerset)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
