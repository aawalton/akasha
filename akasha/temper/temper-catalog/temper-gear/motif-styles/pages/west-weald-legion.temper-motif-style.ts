import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const westWealdLegion = {
  id: "01a05fd7-41f1-7978-b36f-89cdda8eade7",
  pageTypeSlug: "temper-motif-style",
  slug: "west-weald-legion",
  title: "West Weald Legion",
  collectionIndex: 111,
  sourceDescription: "Mirrormoor Incursion dailies (Gold Road)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
