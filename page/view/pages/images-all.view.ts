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
  viewSorts: [{ key: "slug", descending: false }],
  visibleProperties: ["grade"],
} as const satisfies View
