import type { View } from "../view.page-type.ts"

export const homeFavorites = {
  id: "01a06577-2614-7015-87d9-aedd5490da48",
  pageTypeSlug: "view",
  slug: "home-favorites",
  title: "Favorites",
  navSlug: "home",
  viewPredicate: "favorites",
  viewPlace: 0,
  layout: "table",
} as const satisfies View
