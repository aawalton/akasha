import type { View } from "akasha/page/view/view.page-type.types.ts"

export const enchantmentsAlphabetical = {
  id: "01a0c954-1058-75fe-a014-468eb4c0c13e",
  type: "page-type/view",
  slug: "enchantments-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-enchantment",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
