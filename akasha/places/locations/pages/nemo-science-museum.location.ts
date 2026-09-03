import type { Location } from "../location.page-type.ts"

export const nemoScienceMuseum = {
  id: "019f1b49-5557-731c-9fb2-793ca9612aa5",
  pageTypeSlug: "location",
  slug: "nemo-science-museum",
  title: "NEMO Science Museum",
  latitude: 51.4973983,
  longitude: -0.1746726,
  sourcePlaceId: "gmaps:0xc748bda26202cebc",
  sourceUrl:
    "https://www.google.com/maps/place/NEMO+Science+Museum/data=!4m2!3m1!1s0x47c609a4fe55bb9b:0xc748bda26202cebc",
  locationSource: "saved:Netherlands",
} as const satisfies Location
