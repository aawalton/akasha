import type { View } from "akasha/page/view/view.page-type.types.ts"

export const imagesBest = {
  id: "01a0e48f-7bc2-7899-a9f5-ed8ff631102a",
  type: "page-type/view",
  slug: "images-best",
  title: "A- and up",
  nav: "nav/images",
  pageType: "page-type/image",
  viewPlace: 0,
  layout: "gallery",
  galleryCardSize: "medium",
  narrows: [{ key: "grade", comparison: "in", values: ["A-", "A", "A+", "S-", "S", "S+"] }],
  viewSorts: [{ key: "random", descending: false }],
  visibleProperties: ["grade"],
} as const satisfies View
