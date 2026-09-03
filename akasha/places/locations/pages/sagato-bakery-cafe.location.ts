import type { Location } from "../location.page-type.ts"

export const sagatoBakeryCafe = {
  id: "019f1aec-0d27-736f-a1e6-017584430800",
  pageTypeSlug: "location",
  slug: "sagato-bakery-cafe",
  title: "Sagato Bakery & Cafe",
  latitude: 40.6211428,
  longitude: -111.8923523,
  notes: "New zeland/ Samoan food. Try the zinger",
  sourcePlaceId: "gmaps:0xb7d79eb08391358b",
  sourceUrl:
    "https://www.google.com/maps/place/Sagato+Bakery+%26+Cafe/data=!4m2!3m1!1s0x875289fb88e4c227:0xb7d79eb08391358b",
  locationSource: "saved:Want to go",
} as const satisfies Location
