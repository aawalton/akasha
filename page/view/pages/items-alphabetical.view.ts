import type { View } from "akasha/page/view/view.page-type.types.ts"

export const itemsAlphabetical = {
  id: "01a0c954-10a3-7e96-9cbc-e5a8f2fb9db4",
  type: "page-type/view",
  slug: "items-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-item",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
