import type { View } from "../view.page-type.ts"

export const homeFavorites = {
  id: "01a06577-2614-7015-87d9-aedd5490da48",
  pageTypeSlug: "view",
  type: "view",
  slug: "home-favorites",
  title: "Favorites",
  nav: "home",
  viewPredicate: "favorites",
  viewPlace: 0,
  layout: "table",
} as const satisfies View
