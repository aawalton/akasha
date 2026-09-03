import type { View } from "../view.page-type.ts"

export const personasCoversByLevel = {
  id: "01a06577-2614-701f-b0fe-0949de76c472",
  pageTypeSlug: "view",
  slug: "personas-covers-by-level",
  title: "Covers by Level",
  navSlug: "personas",
  drawsSlug: "persona-cover-image",
  viewPlace: 7,
  layout: "gallery",
  viewSorts: [
    { key: "relationship-level", descending: false },
    { key: "title", descending: false },
  ],
  groupBy: "relationship-level",
  visibleProperties: ["persona-slug", "relationship-level", "image-path"],
  alwaysShowProperties: ["relationship-level"],
  pageSize: 20,
  itemPageSize: 12,
  groupPageSize: 20,
  galleryCoverSource: "cover",
  galleryCardSize: "medium",
} as const satisfies View
