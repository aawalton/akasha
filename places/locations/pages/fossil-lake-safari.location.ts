import type { Location } from "../location.page-type.ts"

export const fossilLakeSafari = {
  id: "019f1b49-5166-772f-81e6-c2f50fa482c6",
  pageTypeSlug: "location",
  slug: "fossil-lake-safari",
  title: "Fossil Lake Safari",
  latitude: 43.32486,
  longitude: -120.49248,
  notes: "You gotta go fossil hunting and keep what you find. Most are fish fossils.",
  sourcePlaceId: "gmaps:0xbc284b243d0bf4de",
  sourceUrl:
    "https://www.google.com/maps/place/Fossil+Lake+Safari/data=!4m2!3m1!1s0x8751351a234393cb:0xbc284b243d0bf4de",
  locationSource: "saved:Want to go",
} as const satisfies Location
