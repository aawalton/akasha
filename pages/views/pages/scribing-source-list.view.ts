import type { View } from "../view.page-type.ts"

export const scribingSourceList = {
  id: "01a06577-2615-7005-845b-b92c4aa53dd0",
  pageTypeSlug: "view",
  slug: "scribing-source-list",
  title: "List",
  navSlug: "scribing-source",
  viewPlace: 0,
  visibleProperties: ["page-type-id", "script-type"],
  hiddenPropertiesOrder: ["display-order", "tier-achievements", "seq"],
} as const satisfies View
