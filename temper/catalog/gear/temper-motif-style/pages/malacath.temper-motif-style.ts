import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const malacath = {
  id: "019e5a46-c3ba-7f3f-ba5a-bccc0bee726e",
  type: "page-type/temper-motif-style",
  slug: "malacath",
  title: "Malacath",
  collectionIndex: 12,
  sourceDescription: "World Boss dailies from Arzorag (Orsinium)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
