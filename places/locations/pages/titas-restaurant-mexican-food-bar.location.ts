import type { Location } from "../location.page-type.ts"

export const titasRestaurantMexicanFoodBar = {
  id: "019f1b49-51b8-7e08-a28b-0ae96be4227c",
  pageTypeSlug: "location",
  slug: "titas-restaurant-mexican-food-bar",
  title: "Tita's Restaurant Mexican food & bar",
  latitude: 38.905984,
  longitude: -94.505891,
  notes:
    "All you can eat taco buffet for $13 Monday through Friday 10 AM to 2 PM. \nAdvertised on restaurant group",
  sourcePlaceId: "gmaps:0x38493867f3fbfd6e",
  sourceUrl:
    "https://www.google.com/maps/place/Tita's+Restaurant+Mexican+food+%26+bar/data=!4m2!3m1!1s0x87528da44ec2432b:0x38493867f3fbfd6e",
  locationSource: "saved:Want to go",
} as const satisfies Location
