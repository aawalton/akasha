import type { Location } from "../location.page-type.ts"

export const stPetersBasilica = {
  id: "019f1aec-0db1-7770-9fdd-5f6a10ccd508",
  pageTypeSlug: "location",
  slug: "st-peters-basilica",
  title: "St. Peter's Basilica",
  latitude: 41.893851,
  longitude: 12.4931577,
  sourcePlaceId: "gmaps:0x724bf077cd875283",
  sourceUrl:
    "https://www.google.com/maps/place/St.+Peter's+Basilica/data=!4m2!3m1!1s0x132f6061b7149b59:0x724bf077cd875283",
  locationSource: "saved:Rome, Italy",
} as const satisfies Location
