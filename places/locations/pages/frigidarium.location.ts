import type { Location } from "../location.page-type.ts"

export const frigidarium = {
  id: "019f1aec-0d9c-7770-b9dc-c8f426b651b6",
  pageTypeSlug: "location",
  slug: "frigidarium",
  title: "Frigidarium",
  latitude: 41.8793886,
  longitude: 12.4930529,
  notes:
    "Incredible banana gelato! Yummy (but messy!) complimentary chocolate dip, or whipped cream.",
  sourcePlaceId: "gmaps:0xde0b80504f7164f",
  sourceUrl:
    "https://www.google.com/maps/place/Frigidarium/data=!4m2!3m1!1s0x132f604517b66b91:0xde0b80504f7164f",
  locationSource: "saved:Rome, Italy",
} as const satisfies Location
