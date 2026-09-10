import type { View } from "../view.page-type.types.ts"

export const authorsAll = {
  id: "01a06577-2614-7009-b863-b1c4106e3d03",
  pageTypeSlug: "view",
  type: "view",
  slug: "authors-all",
  title: "All",
  nav: "authors",
  pageType: "ki-author",
  viewPlace: 0,
  layout: "cards",
  viewSorts: [
    { key: "sort-name", descending: false },
    { key: "title", descending: false },
  ],
} as const satisfies View
