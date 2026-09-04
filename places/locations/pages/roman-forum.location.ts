import type { Location } from "../location.page-type.ts"

export const romanForum = {
  id: "019f1aec-0db7-7a9b-baa6-2f175c56a3e0",
  pageTypeSlug: "location",
  slug: "roman-forum",
  title: "Roman Forum",
  latitude: 41.8916414,
  longitude: 12.4867296,
  sourcePlaceId: "gmaps:0xfa914007c0ec7de6",
  sourceUrl:
    "https://www.google.com/maps/place/Roman+Forum/data=!4m2!3m1!1s0x132f61b383a9cdef:0xfa914007c0ec7de6",
  locationSource: "saved:Rome, Italy",
} as const satisfies Location
