import type { Location } from "../location.page-type.ts"

export const rupesBurgers = {
  id: "019f1b49-57b4-753a-bdff-5e39af8fc86b",
  pageTypeSlug: "location",
  slug: "rupes-burgers",
  title: "Rupe's Burgers",
  latitude: 43.706697,
  longitude: -116.627218,
  notes: "Recommended by Kendall",
  sourcePlaceId: "gmaps:0x2595770e082aaa19",
  sourceUrl:
    "https://www.google.com/maps/place/Rupe's+Burgers/data=!4m2!3m1!1s0x53551a9db2e803dd:0x2595770e082aaa19",
  locationSource: "saved:Idaho",
} as const satisfies Location
