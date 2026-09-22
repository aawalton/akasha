import type { View } from "akasha/page/view/view.page-type.types.ts"

export const enchantmentsMostSeen = {
  id: "01a0c954-103e-7c91-bb64-a96dd84897b4",
  type: "page-type/view",
  slug: "enchantments-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-enchantment",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
