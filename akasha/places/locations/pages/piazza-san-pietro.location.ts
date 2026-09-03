import type { Location } from "../location.page-type.ts"

export const piazzaSanPietro = {
  id: "019f1aec-0db2-7bf3-b275-8b75ebf8b3ca",
  pageTypeSlug: "location",
  slug: "piazza-san-pietro",
  title: "Piazza San Pietro",
  latitude: 41.8077718,
  longitude: 12.6804847,
  sourcePlaceId: "gmaps:0xb0be9b5b5aad7258",
  sourceUrl:
    "https://www.google.com/maps/place/Piazza+San+Pietro/data=!4m2!3m1!1s0x132f6067b0ad3535:0xb0be9b5b5aad7258",
  locationSource: "saved:Rome, Italy",
} as const satisfies Location
