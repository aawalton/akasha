import type { View } from "akasha/page/view/view.page-type.types.ts"

export const miraclesAlphabetical = {
  id: "01a0c954-113b-7aaa-bce1-e8d429e2f40d",
  type: "page-type/view",
  slug: "miracles-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-miracle",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
