import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const anequina = {
  id: "019e5a46-c42d-738c-8b4f-d8040ad1285a",
  type: "page-type/temper-motif-style",
  slug: "anequina",
  title: "Anequina",
  collectionIndex: 59,
  sourceDescription: "World Boss/Delve dailies (Northern Elsweyr)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
    "temper-scribing-source/dlc-incursion-dailies",
  ],
} as const satisfies TemperMotifStyle
