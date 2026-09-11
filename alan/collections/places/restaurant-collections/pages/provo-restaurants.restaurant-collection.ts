import type { RestaurantCollection } from "akasha/alan/collections/places/restaurant-collections/restaurant-collection.page-type.types.ts"

export const provoRestaurants = {
  id: "01a06808-aeb8-7001-96d0-118189201a90",
  type: "restaurant-collection",
  slug: "provo-restaurants",
  title: "Provo Restaurants",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies RestaurantCollection
