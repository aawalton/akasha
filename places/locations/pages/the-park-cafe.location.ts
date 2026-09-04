import type { Location } from "../location.page-type.ts"

export const theParkCafe = {
  id: "019f1aec-0d22-7d1e-a22f-451345c7da5d",
  pageTypeSlug: "location",
  slug: "the-park-cafe",
  title: "The Park Café",
  latitude: 40.7414012,
  longitude: -111.873675,
  notes: "Amazing omelets",
  sourcePlaceId: "gmaps:0x39b1fd24cfff540f",
  sourceUrl:
    "https://www.google.com/maps/place/The+Park+Caf%C3%A9/data=!4m2!3m1!1s0x8752f54c10bbabf7:0x39b1fd24cfff540f",
  locationSource: "saved:Want to go",
} as const satisfies Location
