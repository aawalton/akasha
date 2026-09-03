import type { Location } from "../location.page-type.ts"

export const theVikingMuseum = {
  id: "019f1aec-0e08-7434-abb8-d34dff40d026",
  pageTypeSlug: "location",
  slug: "the-viking-museum",
  title: "The Viking Museum",
  latitude: 59.3265806,
  longitude: 18.0949292,
  notes: "Went to with Lizzy. It was small, but the museum tour guide was incredible and inspiring",
  sourcePlaceId: "gmaps:0x894d02084306e0a3",
  sourceUrl:
    "https://www.google.com/maps/place/The+Viking+Museum/data=!4m2!3m1!1s0x465f9d44a4dedd9d:0x894d02084306e0a3",
  locationSource: "saved:Sweden",
} as const satisfies Location
