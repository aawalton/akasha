import type { View } from "akasha/page/view/view.page-type.types.ts"

export const authorsAll = {
  id: "01a06577-2614-7009-b863-b1c4106e3d03",
  type: "page-type/view",
  slug: "authors-all",
  title: "All",
  nav: "nav/authors",
  pageType: "page-type/ki-author",
  viewPlace: 0,
  layout: "cards",
  viewSorts: [{ key: "title", descending: false }],
  createdAt: "2026-09-03T04:11:42.484Z",
  updatedAt: "2026-09-21T19:33:21.000Z",
} as const satisfies View
