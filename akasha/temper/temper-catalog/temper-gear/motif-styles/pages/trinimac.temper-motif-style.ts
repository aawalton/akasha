import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const trinimac = {
  id: "019e5a46-c3b8-7505-aeb9-66bc38b0d942",
  pageTypeSlug: "temper-motif-style",
  slug: "trinimac",
  title: "Trinimac",
  collectionIndex: 11,
  sourceDescription: "Delve dailies from Guruzug (Orsinium)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
