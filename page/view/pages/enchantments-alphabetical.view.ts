import type { View } from "akasha/page/view/view.page-type.types.ts"

export const enchantmentsAlphabetical = {
  id: "01a0c954-1058-75fe-a014-468eb4c0c13e",
  type: "page-type/view",
  slug: "enchantments-alphabetical",
  title: "Alphabetical",
  nav: "nav/innworld-enchantments",
  pageType: "page-type/world-enchantment",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
  createdAt: "2026-09-22T13:35:24.760Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
