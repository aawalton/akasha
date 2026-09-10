import type { View } from "../view.page-type.types.ts"

export const idleLineup2Team = {
  id: "01a06577-2614-7017-8c26-5f5f48268699",
  pageTypeSlug: "view",
  type: "view",
  slug: "idle-lineup-2-team",
  title: "Team",
  nav: "idle-lineup-2",
  pageType: "idle-persona-card",
  viewPlace: 0,
  layout: "gallery",
  narrows: [{ key: "seat-index", comparison: "empty", values: ["false"] }],
  viewSorts: [{ key: "seat-index", descending: false }],
  visibleProperties: ["stars", "rank"],
  galleryCoverSource: "cover",
  galleryCardSize: "small",
  reorderCommand: "idle-lineup-reorder",
} as const satisfies View
