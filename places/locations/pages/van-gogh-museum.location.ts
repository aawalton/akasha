import type { Location } from "../location.page-type.ts"

export const vanGoghMuseum = {
  id: "019f1aec-0e3d-7d2f-a780-02c35d2bec2a",
  pageTypeSlug: "location",
  slug: "van-gogh-museum",
  title: "Van Gogh Museum",
  latitude: 52.3583673,
  longitude: 4.88109,
  sourcePlaceId: "gmaps:0xc22828aef97cc51a",
  sourceUrl:
    "https://www.google.com/maps/place/Van+Gogh+Museum/data=!4m2!3m1!1s0x47c609ef96d35a5f:0xc22828aef97cc51a",
  locationSource: "saved:Netherlands",
} as const satisfies Location
