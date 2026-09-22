import type { View } from "akasha/page/view/view.page-type.types.ts"

export const classesAlphabetical = {
  id: "01a0c954-0f87-7c1f-9330-94dc13fdf997",
  type: "page-type/view",
  slug: "classes-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-class",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
