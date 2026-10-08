import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const campidoglio = {
  id: "019f1aec-0db3-7f9f-aa59-165f7ee44a5a",
  type: "page-type/location",
  slug: "campidoglio",
  title: "Campidoglio",
  latitude: 41.8925778,
  longitude: 12.4822154,
  sourcePlaceId: "gmaps:0xe1efbb238bd1c51",
  sourceUrl:
    "https://www.google.com/maps/place/Campidoglio/data=!4m2!3m1!1s0x132f604c9b68c939:0xe1efbb238bd1c51",
  locationSource: "saved:Rome, Italy",
  createdAt: "2026-06-30T23:45:05.459Z",
  updatedAt: "2026-09-15T17:20:00.000Z",
} as const satisfies Location
