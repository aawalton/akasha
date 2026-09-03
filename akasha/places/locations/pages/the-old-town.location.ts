import type { Location } from "../location.page-type.ts"

export const theOldTown = {
  id: "019f1aec-0d95-71cc-8db7-8cf0e3e280ae",
  pageTypeSlug: "location",
  slug: "the-old-town",
  title: "The Old Town",
  latitude: 56.1589632,
  longitude: 10.1915221,
  sourcePlaceId: "gmaps:0xb5564e6a17eef6c9",
  sourceUrl:
    "https://www.google.com/maps/place/The+Old+Town/data=!4m2!3m1!1s0x464c3fe95ac46a89:0xb5564e6a17eef6c9",
  locationSource: "saved:Denmark",
} as const satisfies Location
