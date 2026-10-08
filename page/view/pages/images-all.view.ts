import type { View } from "akasha/page/view/view.page-type.types.ts"

export const imagesAll = {
  id: "01a0e48f-7bc2-7f56-b6b4-270084dafdeb",
  type: "page-type/view",
  slug: "images-all",
  title: "All",
  nav: "nav/images",
  pageType: "page-type/image",
  viewPlace: 1,
  layout: "gallery",
  galleryCardSize: "medium",
  viewSorts: [{ key: "random", descending: false }],
  visibleProperties: ["grade"],
  createdAt: "2026-09-27T20:30:03.714Z",
  updatedAt: "2026-09-27T22:18:50.000Z",
} as const satisfies View
