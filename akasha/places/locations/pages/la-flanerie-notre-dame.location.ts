import type { Location } from "../location.page-type.ts"

export const laFlanerieNotreDame = {
  id: "019f1b49-540c-7fd7-b7bf-f808a337ed88",
  pageTypeSlug: "location",
  slug: "la-flanerie-notre-dame",
  title: "La Flânerie Notre-Dame",
  latitude: 48.6488394,
  longitude: 1.5330804,
  notes: "Amazing flans. Recommended by cake by Courtney",
  sourcePlaceId: "gmaps:0xd169c4ae6ca8d92b",
  sourceUrl:
    "https://www.google.com/maps/place/La+Fl%C3%A2nerie+Notre-Dame/data=!4m2!3m1!1s0x47e671820441db29:0xd169c4ae6ca8d92b",
  locationSource: "saved:Paris, France",
} as const satisfies Location
