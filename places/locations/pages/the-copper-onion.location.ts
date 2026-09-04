import type { Location } from "../location.page-type.ts"

export const theCopperOnion = {
  id: "019f1aec-0cc3-7929-9c28-386533faddbd",
  pageTypeSlug: "location",
  slug: "the-copper-onion",
  title: "The Copper Onion",
  latitude: 40.76306,
  longitude: -111.887169,
  sourcePlaceId: "gmaps:0x1060fd13b457b3cb",
  sourceUrl:
    "https://www.google.com/maps/place/The+Copper+Onion/data=!4m2!3m1!1s0x8752f511e6e92fad:0x1060fd13b457b3cb",
  locationSource: "saved:Want to go; saved:Favorite places",
} as const satisfies Location
