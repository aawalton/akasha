import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const blackFinLegion = {
  id: "019e5a46-c481-70ec-ae80-812f8b903850",
  type: "page-type/temper-motif-style",
  slug: "black-fin-legion",
  title: "Black Fin Legion",
  collectionIndex: 87,
  sourceDescription: "Delve dailies (Blackwood)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
