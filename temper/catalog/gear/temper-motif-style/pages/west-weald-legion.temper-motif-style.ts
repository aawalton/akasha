import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const westWealdLegion = {
  id: "019e5a46-c4c8-76ef-b6f8-3354743aca60",
  type: "page-type/temper-motif-style",
  slug: "west-weald-legion",
  title: "West Weald Legion",
  collectionIndex: 111,
  sourceDescription: "Mirrormoor Incursion dailies (Gold Road)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
    "temper-scribing-source/dlc-incursion-dailies",
  ],
} as const satisfies TemperMotifStyle
