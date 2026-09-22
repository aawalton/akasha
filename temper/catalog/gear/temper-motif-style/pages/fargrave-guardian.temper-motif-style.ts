import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const fargraveGuardian = {
  id: "019e5a46-c492-7d8b-ae8b-91ed4938b8de",
  type: "page-type/temper-motif-style",
  slug: "fargrave-guardian",
  title: "Fargrave Guardian",
  collectionIndex: 93,
  sourceDescription: "WB dailies (Deadlands/Fargrave)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
