import type { View } from "akasha/page/view/view.page-type.types.ts"

export const itemsAlphabetical = {
  id: "01a0c954-10a3-7e96-9cbc-e5a8f2fb9db4",
  type: "page-type/view",
  slug: "items-alphabetical",
  title: "Alphabetical",
  nav: "nav/innworld-items",
  pageType: "page-type/world-item",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
  createdAt: "2026-09-22T13:35:24.835Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
