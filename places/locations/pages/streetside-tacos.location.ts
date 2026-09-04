import type { Location } from "../location.page-type.ts"

export const streetsideTacos = {
  id: "019f1b49-50aa-731c-8f4b-8906b8181734",
  pageTypeSlug: "location",
  slug: "streetside-tacos",
  title: "Streetside Tacos",
  latitude: 38.927065,
  longitude: -77.025763,
  sourcePlaceId: "gmaps:0x2231108484de104f",
  sourceUrl:
    "https://www.google.com/maps/place/Streetside+Tacos/data=!4m2!3m1!1s0x54936d5622f09e2b:0x2231108484de104f",
  locationSource: "saved:Washington State",
} as const satisfies Location
