import type { View } from "../view.page-type.ts"

export const idleLineupTeam = {
  id: "01a06577-2614-7018-93c7-04829e07214b",
  pageTypeSlug: "view",
  type: "view",
  slug: "idle-lineup-team",
  title: "Team",
  nav: "idle-lineup",
  pageType: "idle-persona-card",
  viewPlace: 0,
  layout: "gallery",
  narrows: [{ key: "seat-index", comparison: "empty", values: ["false"] }],
  viewSorts: [{ key: "seat-index", descending: false }],
  visibleProperties: ["stars", "rank"],
  galleryCoverSource: "cover",
  reorderCommand: "idle-lineup-reorder",
} as const satisfies View
