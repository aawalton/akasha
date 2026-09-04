import type { Location } from "../location.page-type.ts"

export const heidelbergPalace = {
  id: "019f1b49-5623-7cc0-a690-5870d42860e5",
  pageTypeSlug: "location",
  slug: "heidelberg-palace",
  title: "Heidelberg Palace",
  latitude: 50.1106444,
  longitude: 8.6820917,
  sourcePlaceId: "gmaps:0x6d672e3649e97eea",
  sourceUrl:
    "https://www.google.com/maps/place/Heidelberg+Palace/data=!4m2!3m1!1s0x4797c100ca43db93:0x6d672e3649e97eea",
  locationSource: "saved:Frankfurt, Germany",
} as const satisfies Location
