import type { RestaurantCollection } from "../restaurant-collection.page-type.ts"

export const provoRestaurants = {
  id: "01a06808-aeb8-7001-96d0-118189201a90",
  pageTypeSlug: "restaurant-collection",
  slug: "provo-restaurants",
  title: "Provo Restaurants",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies RestaurantCollection
