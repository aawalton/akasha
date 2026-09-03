import type { Location } from "../location.page-type.ts"

export const pantheon = {
  id: "019f1aec-0db0-744d-89f1-2b6a9091ab49",
  pageTypeSlug: "location",
  slug: "pantheon",
  title: "Pantheon",
  latitude: 41.898616,
  longitude: 12.4768334,
  sourcePlaceId: "gmaps:0xcad165fa2036ce2c",
  sourceUrl:
    "https://www.google.com/maps/place/Pantheon/data=!4m2!3m1!1s0x132f604f678640a9:0xcad165fa2036ce2c",
  locationSource: "saved:Rome, Italy",
} as const satisfies Location
