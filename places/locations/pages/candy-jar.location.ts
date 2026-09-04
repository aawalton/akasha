import type { Location } from "../location.page-type.ts"

export const candyJar = {
  id: "019f1b49-57b8-72e5-a02b-c3b14f3abe40",
  pageTypeSlug: "location",
  slug: "candy-jar",
  title: "Candy Jar",
  latitude: 43.495804,
  longitude: -112.034002,
  notes: "Ice cream with reeds",
  sourcePlaceId: "gmaps:0xdf0e50d9f327e840",
  sourceUrl:
    "https://www.google.com/maps/place/Candy+Jar/data=!4m2!3m1!1s0x53551b6847a6312f:0xdf0e50d9f327e840",
  locationSource: "saved:Idaho",
} as const satisfies Location
