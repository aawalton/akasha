import type { View } from "akasha/page/view/view.page-type.types.ts"

export const enchantmentsMostSeen = {
  id: "01a0c954-103e-7c91-bb64-a96dd84897b4",
  type: "page-type/view",
  slug: "enchantments-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-enchantments",
  pageType: "page-type/world-enchantment",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:24.734Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
