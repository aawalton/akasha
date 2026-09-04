import type { Location } from "../location.page-type.ts"

export const twoSizes = {
  id: "019f1aec-0d9d-7ad4-94e7-76b3741ea74c",
  pageTypeSlug: "location",
  slug: "two-sizes",
  title: "Two Sizes",
  latitude: 41.8980059,
  longitude: 12.471523,
  notes: "Strawberry tiramisu was coffee free!",
  sourcePlaceId: "gmaps:0xe8f4e4319c2df271",
  sourceUrl:
    "https://www.google.com/maps/place/Two+Sizes/data=!4m2!3m1!1s0x132f604566693529:0xe8f4e4319c2df271",
  locationSource: "saved:Rome, Italy",
} as const satisfies Location
