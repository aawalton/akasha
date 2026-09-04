import type { Location } from "../location.page-type.ts"

export const cafeBelga = {
  id: "019f1aec-0ed6-7f18-b730-c26c37939c37",
  pageTypeSlug: "location",
  slug: "cafe-belga",
  title: "Café Belga",
  latitude: 50.8270373,
  longitude: 4.3726001,
  notes: "Awesome cafe",
  sourcePlaceId: "gmaps:0x6337effe0bd0a729",
  sourceUrl:
    "https://www.google.com/maps/place/Caf%C3%A9+Belga/data=!4m2!3m1!1s0x47c3c49346bc1c65:0x6337effe0bd0a729",
  locationSource: "saved:Belgium",
} as const satisfies Location
