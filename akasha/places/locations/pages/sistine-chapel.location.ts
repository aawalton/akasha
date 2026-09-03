import type { Location } from "../location.page-type.ts"

export const sistineChapel = {
  id: "019f1b49-53e7-7c71-820f-99344c5cfce1",
  pageTypeSlug: "location",
  slug: "sistine-chapel",
  title: "Sistine Chapel",
  latitude: 41.901229,
  longitude: 12.467449,
  sourcePlaceId: "gmaps:0xab16c8877fb53e22",
  sourceUrl:
    "https://www.google.com/maps/place/Sistine+Chapel/data=!4m2!3m1!1s0x132f6065c523afdb:0xab16c8877fb53e22",
  locationSource: "saved:Rome, Italy",
} as const satisfies Location
